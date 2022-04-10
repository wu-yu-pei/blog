let hasToken = JSON.parse(sessionStorage.getItem('Token')) || prompt('请输入密码');
if (hasToken != '1978') {
  alert('密码错误');
  history.go(-1);
} else {
  sessionStorage.setItem('Token', '1978');
}