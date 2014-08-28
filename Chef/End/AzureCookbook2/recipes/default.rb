# This line will install Apache2 from the current source on internet
windows_package 'apache2' do
    source 'http://apache.osuosl.org//httpd/binaries/win32/httpd-2.0.65-win32-x86-openssl-0.9.8y.msi'
    action :install 
end


# Copy the configuration file for apache in the right location 
cookbook_file 'C:/Program Files (x86)/Apache Group/Apache2/conf/httpd.conf' do
    source 'httpd.conf'
end


# Install Apache as a service on Windows using the command line
windows_batch "ApacheAsService" do
    code <<-EOH
    "C:\\Program Files (x86)\\Apache Group\\Apache2\\bin\\Apache.exe" -k install
    EOH
end


# Create the file from a template that will be home page of our site
template "C:/Program Files (x86)/Apache Group/Apache2/htdocs/index.html" do
    source "index.html.erb"    
end


# Enable Port 80 on the Firewall of the VM
powershell_script "FWPort80" do
    code <<-EOH 
    New-NetFirewallRule -DisplayName "Allow Apache" -Direction Inbound -Program "C:\\Program Files (x86)\\Apache Group\\Apache2\\bin\\Apache.exe"
    EOH
end


# Ensure that the apache service is started 
service "Apache2" do
    action :start 
end
