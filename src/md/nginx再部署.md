#### nginx 部署相关应用

> 之前使用 nginx 部署应用，只会把应用部署再不同的端上，今天再学习部署，学会了二级域名的使用还挺方便

##### 相关配置如下

- 之前的配置

```shell
# vue3-vite
server {
    listen 5000;
    server_name  127.0.0.1;
    location / {
         root /home/vue/vue3-vite-dist;
         index  index.html index.htm;
     }
}

# vue3-ts
server {
    listen 5001;
    server_name  127.0.0.1;
    location / {
         root /home/vue/vue3-ts-dist;
         index  index.html index.htm;
     }
}

# index-page
server {
    listen 9999;
    server_name  wuyupei.top;
    location / {
         root /home/index-page/dist;
         index  index.html index.htm;
     }
}
```

- 现在的配置

```shell
# vue3-vite
server {
    listen 80;
    server_name  v3js.wuyupei.top;
    location / {
         root /home/vue/vue3-vite-dist;
         index  index.html index.htm;
     }
}

# vue3-ts
server {
    listen 80;
    server_name  v3ts.wuyupei.top;
    location / {
         root /home/vue/vue3-ts-dist;
         index  index.html index.htm;
     }
}

# blog
server {
    listen 80;
    server_name  wuyupei.top;
    location / {
         root /home/blog;
         index  index.html index.htm;
     }
}
# index-page
server {
    listen 80;
    server_name  page.wuyupei.top;
    location / {
         root /home/index-page/dist;
         index  index.html index.htm;
     }
}
```

其他相关配置：

1. 代理：proxy_pass
2. 负载均衡：upstream {
   server 192.168.1.201
   ...
   }
3. 负载均衡相关算法
   - 轮询等相关
   - ip...
   - url...
   - ...

**明天继续 OLG**
