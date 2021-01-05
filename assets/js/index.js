
// 封装函数 :获取用户数据
function getUserInfo() {
    // 使用ajax函数发起数据请求
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // 因为隐藏的请求都是需要headers
        headers: {
            Authorization: localStorage.getItem('token') || '',
        },
        success: function (res) {
            console.log(res)
            // 判断数据是否获取成功
            if (res.status !== 0)
                return layui.layer.msg("获取数据失败")
            userPhoto(res.data)
        }
    })

}
getUserInfo()

// 封装函数:调用用户的头像
function userPhoto(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    // 判断用户是否有头像的设置
    if (user.user_pic !== null) {
        // attr 第一个参数是属性，第二个参数是属性值
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        // 文本第一个字母
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}
var layer = layui.layer
// 退出系统设置
$('#btnLogout').on('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        location.href = '/login.html'

        // 关闭 confirm 询问框
        layer.close(index)
    })
})