/**
 * 页面顶部、右侧栏导航菜单
 */

// 全局主导航菜单选中的ID
var globalDefaultMainNavMenuId = null;
if (typeof(CURRENT_MENU_ID) != 'undefined') {
    globalDefaultMainNavMenuId = CURRENT_MENU_ID;
}

function checkLoginForm(formObj) {
    if (formObj.u_name.value == "") {
        layer.alert("用户名不能为空！");
        formObj.u_name.focus();
        return false;
    }
    if (formObj.u_password.value == "") {
        layer.alert("密码不能为空！");
        formObj.u_password.focus();
        return false;
    }
}
/**
 * 选择主导航菜单
 * @param  {[type]} menuId [description]
 * @return {[type]}        [description]
 */
function selectNavMenu(menuId) {
    globalDefaultMainNavMenuId && $("#J_mainMenu_" + globalDefaultMainNavMenuId).removeClass('current');
    globalDefaultMainNavMenuId = menuId;
    $("#J_mainMenu_" + globalDefaultMainNavMenuId).addClass('current');
}


// 顶部导航栏初始化
$(function() {

    // 填充所有菜单的滚动消息
    $("#J_mainNavWrapper .scroll-msg-container").html($("#J_scrollMsgContent").html());
    // 当前导航中所有滚动消息 都滚动上
    $("#J_mainNavWrapper .scroll-msg").slide({
        mainCell: ".bd ul",
        autoPage: true,
        effect: "topLoop",
        autoPlay: true,
        easing: "easeOutCirc"
    });

    $(".westdialogopen").click(function() {
        var me = $(this);
        var link_ = me.attr("href");
        var title = me.attr("title");
        var diaid = "westdialogopen_me";
        if (link_.substr(1, 1) != "/") {
            diaid += "qq";
        }
        $.dialog({
            title: title,
            width: 800,
            height: 500,
            content: "url:" + link_,
            zIndex: 9999999,
            id: diaid
        })
        return false;
    });

    // 下拉事件注册
    $(".common-dropdown-container").hover(function() {
        var target = $(this);
        clearTimeout(target.attr('data-timehandler'));
        var timeoutHandler = setTimeout(function() {
            target.find('.menu').addClass('hover');
            target.find('.common-dropdown').stop().slideDown(300);
        }, 100);
        target.attr('data-timehandler', timeoutHandler);
    }, function() {
        var target = $(this);
        clearTimeout(target.attr('data-timehandler'));
        if (typeof(WJF_DEBUG) != 'undefined') {
            return;
        }
        target.find('.menu').removeClass('hover');
        target.find('.common-dropdown').stop().slideUp(200);
    });

    // 主导航
    var mainNavTimeoutHandle;
    $("#J_mainNavWrapper >li").hover(function() {
        var currentLink = $(this).find('a.nav-menu');
        var targetNavContent = $(this).find('.nav-content');
        clearTimeout(mainNavTimeoutHandle);
        mainNavTimeoutHandle = setTimeout(function() {
            currentLink.addClass('hover');
            // 设置宽度修复ie7下 先下拉再展开问题
            targetNavContent.addClass('active').css('width', $('body').width() + 'px').stop().slideDown(300);
        }, 150);
    }, function() {
        if (typeof(WJF_DEBUG) != 'undefined') {
            return
        }
        clearTimeout(mainNavTimeoutHandle);
        var currentLink = $(this).find('a.nav-menu');
        currentLink.removeClass('hover');
        var targetNavContent = $(this).find('.nav-content');
        targetNavContent.removeClass('active').stop().slideUp(200);
    });

    // ie6 支持
    if (typeof(DD_belatedPNG) != 'undefined') {
        // 添加placehoder支持
        // WJF.uiTool.placeholder("#J_u_name");
        // WJF.uiTool.placeholder("#J_u_password");
    }
    // 指定了全局主导航菜单ID
    if (globalDefaultMainNavMenuId) {
        selectNavMenu(globalDefaultMainNavMenuId);
    } else {
        // 根据当前页面URL匹配
        var pageUrl = document.URL.toLowerCase();
        var dftMenu = '';
        if (pageUrl.indexOf("/services/domain/") >= 0) {
            dftMenu = 'ymzc';
        } else if (pageUrl.indexOf("/services/whois/") >= 0) {
            dftMenu = 'ymzc';
        } else if (pageUrl.indexOf("/services/host/") >= 0) {
            dftMenu = 'xnzj';
        } else if (pageUrl.indexOf("/services/sql/") >= 0) {
            dftMenu = 'xnzj';
        } else if (pageUrl.indexOf("/services/host/buy.asp") >= 0) {
            dftMenu = 'xnzj';
        } else if (pageUrl.indexOf("/services/sql/buy.asp") >= 0) {
            dftMenu = 'xnzj';
        } else if (pageUrl.indexOf("/services/host/order.asp") >= 0) {
            dftMenu = 'xnzj';
        } else if (pageUrl.indexOf("/services/sql/order.asp") >= 0) {
            dftMenu = 'xnzj';
        } else if (pageUrl.indexOf("/services/cdn/order.asp") >= 0) {
            dftMenu = 'xnzj';
        } else if (pageUrl.indexOf("/services/cdn/") >= 0) {
            dftMenu = 'xnzj';
        } else if (pageUrl.indexOf("/services/cdn/buy.asp") >= 0) {
            dftMenu = 'xnzj';
        } else if (pageUrl.indexOf("/services/cloud/") >= 0) {
            dftMenu = 'yfwq';
        } else if (pageUrl.indexOf("/services/vps/") >= 0) {
            dftMenu = 'vps';
        } else if (pageUrl.indexOf("/services/server/") >= 0) {
            dftMenu = 'zjzy';
        } else if (pageUrl.indexOf("/services/servertg/") >= 0) {
            dftMenu = 'zjzy';
        } else if (pageUrl.indexOf("/services/serverjg/") >= 0) {
            dftMenu = 'zjzy';
        } else if (pageUrl.indexOf("/services/cloud/") >= 0) {
            dftMenu = 'yun';
        } else if (pageUrl.indexOf("/services/mail/") >= 0) {
            dftMenu = 'qyyj';
        } else if (pageUrl.indexOf("/services/sites/") >= 0) {
            dftMenu = 'cpwz';
        } else if (pageUrl.indexOf("/login/") >= 0) {
            dftMenu = 'sy';
        } else if (pageUrl.indexOf("/reg/") >= 0) {
            dftMenu = 'sy';
        } else if (pageUrl.indexOf("/news/") >= 0) {
            dftMenu = 'sy';
        } else if (pageUrl.indexOf("/faq/") >= 0) {
            dftMenu = 'sy';
        } else if (pageUrl.indexOf("/guild/") >= 0) {
            dftMenu = 'sy';
        } else if (pageUrl.indexOf("/topics/") >= 0) {
            dftMenu = 'sy';
        } else if (pageUrl.indexOf("/user/") >= 0) {
            dftMenu = 'sy';
        } else if (pageUrl.indexOf("/active/ymh/") >= 0) {
            dftMenu = 'sy';
        } else if (pageUrl.indexOf("/services/agent/") >= 0) {
            dftMenu = 'dlzq';
        } else if (pageUrl.indexOf("/jiaoyi") >= 0) {
            dftMenu = 'ymjy';
        } else if (pageUrl.indexOf("/diysite") >= 0) {
            // dftMenu = '3';
        } else if (pageUrl.indexOf("/customercenter") >= 0 || pageUrl.indexOf("/faq") >= 0) {
            // dftMenu = 10;
        }
        if (dftMenu) {
            selectNavMenu(dftMenu);
        } else {
            // 选中首页
            (window.location.pathname == "/" || window.location.pathname == '/default.asp') && selectNavMenu('sy');
        }
    }
});


// 紧急公告
$(function() {
    $("#J_globalNotice .expand").on('click', function() {
        var expand = $(this);
        // 当前已经展开了
        if (expand.hasClass('collapse')) {
            expand.removeClass('collapse');
            $("#J_globalNotice .notice-content").removeClass('notice-content-expanded');
            expand.text('查看更多');
        } else {
            expand.addClass('collapse');
            $("#J_globalNotice .notice-content").addClass('notice-content-expanded');
            expand.text('收缩显示');
        }
    });
    $("#J_globalNotice .close").on('click', function() {
        $("#J_globalNotice").fadeOut();
        document.cookie = 'HIDE_G_NOTICE=1;'
    });
});

// 侧边栏代码
$(function() {
    // 右边侧栏容器
    var rightMenuBarContainer = $("#rightMenuBar2016");
    if (!rightMenuBarContainer.length) {
        return;
    }
    // 如果不显示右侧栏 则设置该标示为false
    if (typeof(G_SHOW_RIGHT_BAR) != 'undefined' && G_SHOW_RIGHT_BAR === false) {
        rightMenuBarContainer.hide();
        return;
    }
    var minHeight = 100;
    $(window).scroll(function() {
        var s = $(window).scrollTop();
        if (s > minHeight) {
            $("#J_backTop").addClass('back-top-visible');
        } else {
            $("#J_backTop").removeClass('back-top-visible');
        }
    });
    $(window).trigger('scroll');
    $("#J_backTop").on('click', function() {
        $('html,body').stop();
        $('html,body').animate({
            scrollTop: 0
        }, 400, 'swing');
        return false;
    });
    // 侧栏点击
    var prevLink = null;
    $("#J_rightBarMenuContainer").on('click', 'a', function(event) {
        var currentLink = $(this);
        prevLink && prevLink.removeClass('hover');
        currentLink.addClass('hover');

        var concatPhoneContainer = $("#J_concatPhoneContainer");
        // 电话处理
        if (currentLink.hasClass('phone')) {
            if (concatPhoneContainer.hasClass('active-concat-container')) {
                concatPhoneContainer.removeClass('active-concat-container');
                currentLink.removeClass('hover');
            } else {
                concatPhoneContainer.addClass('active-concat-container');
            }
        } else {
            concatPhoneContainer.removeClass('active-concat-container');
        }
        prevLink = currentLink;
    });

    // 联系电话
    $("#J_concatPhoneContainer").on('click', '.close', function() {
        $('#J_concatPhoneContainer').removeClass('active-concat-container');
        $("#J_rightBarMenuContainer a.phone").removeClass('hover');
    });

    // 关闭侧栏
    $("#J_closeRightBar").on('click', function() {
        rightMenuBarContainer.css('right', '-40px');
        rightMenuBarContainer.addClass('mini-right-menu-bar');
        var date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = '_rbarStatus=0;expires=' + date.toUTCString() + ';';
        return false;
    });
    // 展开侧栏
    $("#J_expandRightBar").on('click', function() {
        rightMenuBarContainer.removeClass('mini-right-menu-bar');
        rightMenuBarContainer.css('right', '0px');
        var date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = '_rbarStatus=1;expires=' + date.toUTCString() + ';';
        return false;
    });
    // 初始化边栏
    if (document.cookie.match(/_rbarStatus=0/) /*|| document.body.clientWidth < 1190*/ ) {
        // 添加侧栏最小化标记
        rightMenuBarContainer.addClass('mini-right-menu-bar');
    } else {
        rightMenuBarContainer.css('right', '0px');
    }
});
