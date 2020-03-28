/**
 * 新版本页面 公共js以及WJF
 * 主要用于提供：页面通用且非组件或模块化的代码
 * 需要才使用 否则不使用
 */
$.cookie = $.cookie || function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({},
                options);
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

if (typeof(WJF) == 'undefined') {
    WJF = {};
}
WJF.namespace = WJF.namespace || function(namespace) {
    if (!namespace) {
        return;
    }
    namespace = namespace.split('.');

    var newSpace = window;
    for (var i = 0, len = namespace.length; i < len; i++) {
        newSpace = newSpace[namespace[i]] = newSpace[namespace[i]] || {};
    }
};
WJF.namespace('WJF.uiTool');
// 简单通用UI效果实现
WJF.uiTool = {
    initTab: function(tabId, opts) {
        opts = opts || {};
        // 默认情况下使用active 但可以追加激活的class
        var activeCls = (opts.activeCls ? opts.activeCls + ' active' : '') || 'active';
        var tabs = $("#" + tabId);
        var currentActiveTabLink = tabs.find('a.active');
        var currentActiveContentId = currentActiveTabLink.attr('data-target');
        var prevActiveTabLink = null;
        $("#" + currentActiveContentId).removeClass(activeCls).addClass(activeCls);
        tabs.on('click', 'li', function(event) {
            if (opts.onBeforeChange && opts.onBeforeChange(tabId, $(this), event) === false) {
                return;
            }
            // 移除前一个选中内容
            $("#" + currentActiveContentId).removeClass(activeCls);
            currentActiveTabLink.removeClass(activeCls);
            prevActiveTabLink = currentActiveTabLink;

            currentActiveTabLink = $(this).find('a');
            currentActiveTabLink.removeClass(activeCls).addClass(activeCls);

            var clickTabContentId = currentActiveTabLink.attr('data-target');
            $("#" + clickTabContentId).removeClass(activeCls).addClass(activeCls);

            // 点击回调 tab Id ,当前选中TAB ID 前一个TAB ID
            if (clickTabContentId != currentActiveContentId) {
                // tab父容器ID 用于区分是哪个tab父容器
                // 当前点击的tab下li容器
                // 当前激活的内容区域ID
                // 前一个的容器 ID
                // 前一个激活的标签对象 jq
                // 当前激活的标签对象
                opts.onTabChange && opts.onTabChange(tabId, $(this), clickTabContentId, currentActiveContentId, prevActiveTabLink, currentActiveTabLink, event);
            }
            currentActiveContentId = clickTabContentId;
        });

    },
    createTab: function(tabId, opts) {
        // opts = opts || {};
        // if (opts.onTabChange) {
        //     var oriFn = opts.onTabChange;
        //     opts.onTabChange = function(tabId, currentLiDom, clickTabContentId, currentActiveContentId, prevActiveTabLink, currentActiveTabLink) {
        //         oriFn({
        //             tabId: tabId,
        //             currentLiDom:currentLiDom
        //             currentContentID:currentLiDom,
        //             prevContentId
        //         });
        //     };
        // }
    },
    /**
     * 针对不支持placeholder浏览器 模拟实现
     * @param  {[type]} selector [description]
     * @return {[type]}          [description]
     */
    placeholder: function(selector) {
        // 如果支持 直接返回
        if ('placeholder' in document.createElement('input')) {
            return;
        }
        $(selector || '[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            } else {
                input.removeClass('placeholder');
            }
        }).blur();
    }
}
