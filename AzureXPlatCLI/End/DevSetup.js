//Bring in all required modules
var scripty = require('azure-scripty');
var nconf = require('nconf');
var async = require('async');

//Load configuration file
nconf.file({ file: 'config.json' });

//////////////////////////////////////////////////////////////////////////////
//Creates an affinity group if specified one doesn't exist
//////////////////////////////////////////////////////////////////////////////
function createAffinityGroup(cb) {
    console.log('Getting affinity groups...');
    scripty.invoke('account affinity-group list', function (err, result) {
        
        if (err) {
            return cb(err);
        }
        console.log('Current affinity groups');
        for (var i in result) {
            console.log(result[i].name);
        }
        
        var affinityGroup = nconf.get('affinity_group').name;
        var label = nconf.get('affinity_group').label;
        for (var i in result) {
            if (result[i].name === affinityGroup && result[i].label === label) {
                //the affinty group to use in the config already exists
                return cb();
            }
        }
        
        console.log('Specified affinity group ' + affinityGroup + ' does not exist, creating new one...');
        var cmd = {
            command: 'account affinity-group create',
            positional: [affinityGroup],
            location: '\"West US\"',
            label: label
        };
        
        scripty.invoke(cmd, function (err) {
            if (err) {
                cb(err);
            }
            return cb();
        });
    });
}

//////////////////////////////////////////////////////////////////////////////
//Creates the config specified vnet, if it doesn't already exist
//////////////////////////////////////////////////////////////////////////////
function createVirtualMachines(count, cb) {
    
    console.log('Getting list of virtual machines...');
    
    scripty.invoke('vm list', function (err, result) {
        
        if (err) {
            return cb(err);
        }
        
        var baseName = nconf.get('vm_base_name');
        
        var vmNames = [];
        
        //create the array of the computed VM names
        for (var z = 0; z < count; z++) {
            vmNames.push(baseName + z.toString());
        }
        
        //go through the list of existing vms
        for (var i in result) {
            
            for (var k in vmNames) {
                
                if (result[i].VMName === vmNames[k]) {
                    //A VM we intend on creating already exists on this sub.
                    //remove it on the list of VMs to create
                    delete vmNames[k];
                }
            }
        }
        
        //vmNames now only contains the name of VMs that do not exist
        //create them
        
        var domainName = nconf.get('dns_name');
        var userName = nconf.get('vm_username');
        var password = nconf.get('vm_password');
        var imageName = nconf.get('vm_image_name');
        var vmCreationTasks = [];
        var taskArguments = [];
        
        for (var m in vmNames) {
            
            if (vmNames[m]) {
                var cmd = {
                    command: 'vm create',
                    positional: [vmNames[m], imageName, userName, password],
                    'affinity-group': nconf.get('affinity_group').name,
                    'virtual-network-name': nconf.get('vnet_name')
                }
                
                var task = function (args, cb) {
                    console.log('Creating vm ' + vmNames[args[0]]);
                    scripty.invoke(args[1], function (err) {
                        
                        if (err) {
                            console.log('Vm creation failed: ' + vmNames[args[0]]);
                            return cb(err);
                        }
                        
                        console.log('vm creation of ' + vmNames[args[0]] + ' successful');
                        cb();
                    });
                }
                
                task = task.bind(this, [m, cmd]);
                vmCreationTasks.push(task);
            }
        
        }
        
        async.series(vmCreationTasks, function (err) {
            
            if (err) {
                
                return cb(err);
            
            }
            
            console.log('All VMs created successfully!');
            cb();
        })

    });
}

//////////////////////////////////////////////////////////////////////////////
//Main Entry Point
//////////////////////////////////////////////////////////////////////////////
createAffinityGroup(function (err) {
    if (err) {
        return console.error(err);
    }
    
    createVirtualNetwork(function (err) {
        
        if (err) {
            return console.error(err);
        }
        var vmCount = nconf.get('vm_count');
        createVirtualMachines(vmCount, function (err) {
            
            if (err) {
                return console.error(err);
            }
            
            console.log('Succeeded');
        });
        
    });
});