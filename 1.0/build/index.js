/*
combined files : 

gallery/linkage/1.0/index

*/
/**
 * @fileoverview 
 * @author 明河<minghe12@126.com>
 * @module Linkage
 **/
KISSY.add('gallery/linkage/1.0/index',function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;

    /**
     * 通过表单元素的type确定默认事件
     * @param $el
     * @return {string}
     */
    function getDefaultEvent($el){
        var event = 'click';
        if(!$el.length) return event;
        var type = $el.attr('type');
        if(!type){
            var tagName = $el.getDOMNode().tagName;
            if(tagName == 'SELECT') type = "select";
            if(tagName == 'TEXTAREA') type = "textarea";
        }
        switch (type) {
            case "select":
                event = 'change';
                break;
            case 'text' || 'textarea':
                event='blur';
                break;
        }
        return event;
    }

    /**
     * 
     * @class Linkage
     * @constructor
     * @extends Base
     */
    function Linkage(target,comConfig) {
        var self = this;
        if(!comConfig) comConfig = {};
        if(target) S.mix(comConfig,{target:target});
        //调用父类构造函数
        Linkage.superclass.constructor.call(self, comConfig);
    }

    /**
     * 显示联动元素
     * @param $target
     * @param $srcNode
     * @return {boolean}
     */
    Linkage.show = function($target,$srcNode){
        if(!$target.length || !$srcNode.length) return false;
        //已经显示，退出
        if($target.css('display') == 'block') return false;
        //多选框，处于选中状态才显示
        if($srcNode.type == 'checkbox'){
            if($srcNode.prop('checkbox')) _show();
            return true;
        }else{
            _show();
        }

        function _show(){
            $target.slideDown(0.3);
        }
    }

    S.extend(Linkage, Base, /** @lends Linkage.prototype*/{
        /**
         * 运行
         * @return {boolean}
         */
        render:function(){
            var self = this;
            var $target = self.get('target');
            if(!$target.length) return false;

            var $linkage = $target.all(self.get('hook'));
            if(!$linkage.length) return false;

            if(self.get('isHide')) $linkage.hide();

            $linkage.each(function($el){
                //condition="#input_1:click"
                var condition = $el.attr('condition');
                if(!condition) return true;
                var aCondition = condition.split(':');
                var $srcNode = $(aCondition[0]);
                //默认为点击事件
                if(!aCondition[1]) aCondition[1] = getDefaultEvent($srcNode);
                //联动的上级目标元素
                var $target = $(aCondition[0]);
                if(!$target.length){
                    S.log(aCondition[0]+'元素不存在！');
                    return true;
                }
                //使用的动作函数，默认为show，即显示隐藏联动元素
                //action="show"
                var action = $el.attr('action') || 'show';
                $srcNode.on(aCondition[1],function(ev){
                     if(S.isFunction(Linkage[action])){
                         //触发联动动作
                         Linkage[action].call(self,$el,$srcNode);
                         self.fire('linkage',{target:$el,srcNode:$srcNode,event:ev.type});
                     }
                })
            })
        }
    }, {ATTRS : /** @lends Linkage*/{
        /**
         * 目标元素
         */
        target:{
            value:EMPTY,
            getter:function(v){
                return $(v);
            }
        },
        hook:{value:".J_Linkage"},
        isHide:{value:true}
    }});
    return Linkage;
}, {requires:['node', 'base','sizzle']});




