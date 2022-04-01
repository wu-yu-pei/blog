+ 命令格式
    命令 [-参数] [选项]

+ 参数
    -a
    --all

s上面者两个有什么区别呢?
    -a     a是 all的缩写
    --all  all是完整参数
    所以 一般 --后面跟的是一个完整的参数 -后面跟的是参数的缩写

<!-- 文件操作 -->
例:
ls -a
ls -l
ls -d (显示当前文件目录的属性,而不看它目录下的内容)
ls -i (显示文件的id号)
ks -h (显示文件名在一行上)
ls -lad

权限          引用个数   用户   所属组   大小     最后修改时间          文件名
drwxr-xr-x    2        root   root     4096     Mar 31 19:24         linux第一天

-rw-r--r--    1        root   root     16       Mar 31 19:23         a.txt

(权限: - 表示是一个文件,d 表示是一个文件夹,l 表示是一个软连接)(r : 读, w: 写, x: 执行)
-rwxrwxrwx
-rw-r--r--
 u  g  o
(-表示没有这个权限)




g跟上参数:
ls -a ~
ls -a /


那么~ / 又有什么区别呢?
    + / 表示根目录
    + ~ 表示用户目录



文件和用户的关系:
u      g         o

user   group     outher

用户    所属组    其他人

<!-- 目录操作 -->

mkdir xiaodianying
mkdir -p Japan/person  (-p参数 递归创建)
mk dir a b c (创建多个文件夹)

rmdir 删除空目录
rmdir xiaodianyying

<!-- 复制 -->
cp 复制文件
cp -r 复制文件夹
cp -p 保存文件属性(时间等....)
ap a.txt b.txt b cp可以同时复制多个文件

<!-- 移动文件 -->
mv 移动文件

小技巧 改名 mv a.txt b.txt --> 把a.txt 改名为 b.txt


<!-- rm -->
rm 删除文件
rm -r 删除文件夹
rm -f 强制删除

<!-- touch -->
touch 创建文件

touch a.txt b.txt
touch "a b.txt"

<!-- cat -->
cat 显示文件内容
cat -n 显示文件内容和行号

<!-- tac -->
tac 倒着显示

<!-- more -->
more a.txt (大文件显示 空格翻页 回车一行一行看 f翻页)

<!-- less -->
less a.txt (与 more一样 可以向上翻页 pageup ↑)
/ 搜索 下一个

<!-- head -->
head -n 10 a.txt (显示前多少行)


<!-- tail -->
tail -n 10 a.txt (显示后多少行)