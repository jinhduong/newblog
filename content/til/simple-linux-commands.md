---
title: "Simple Linux Commands"
date: 2018-07-06T15:51:32+08:00
---

# Simple linux commands
## Nginx
Management
```bash
sudo service nginx start
sudo service nginx stop
sudo service nginx restart
```

Install
```bash
sudo -s
nginx=stable # use nginx=development for latest development version
add-apt-repository ppa:nginx/$nginx
apt-get update
apt-get install nginx
```

Point `nginx` to localy port, path : *`/etc/nginx/sites-available/default`*
```bash
server {
    listen        80 default_server;
    server_name   example.com *.example.com;
    location / {
        proxy_pass         http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

## Service definition
Add service definition file:
``` bash
sudo nano /etc/systemd/system/kestrel-hellomvc.service
```

`dotnet` simple service def file:
``` bash
[Unit]
Description=Example .NET Web API App running on Ubuntu

[Service]
WorkingDirectory=/var/aspnetcore/hellomvc
ExecStart=/usr/bin/dotnet /var/aspnetcore/hellomvc/hellomvc.dll
Restart=always
# Restart service after 10 seconds if the dotnet service crashes:
RestartSec=10
SyslogIdentifier=dotnet-example
User=root
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

[Install]
WantedBy=multi-user.target
```

Enable service def file
```bash
systemctl enable kestrel-hellomvc.service
```

Start and verify it is working
```bash
systemctl start kestrel-hellomvc.service
systemctl status kestrel-hellomvc.service
```

Reload file changed in system
```bash
systemctl daemon-reload
```

Tracking the logs of it
```bash
sudo journalctl -fu kestrel-hellomvc.service
```

For further filtering, time options such as `--since today`, `--until 1 hour ago` or a combination of these can reduce the amount of entries returned.
```bash
sudo journalctl -fu kestrel-hellomvc.service --since "2016-10-18" --until "2016-10-18 04:00"
```

