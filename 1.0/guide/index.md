## 综述

Linkage是元素联动关系处理组件，特别适合像调查问卷类的联动表单场景。

* 作者：明河
* 版本：1.0（beta中，欢迎提issue）

## 快速使用

一个简单的联动地区选择，看[demo](../demo/simple.html)

### HTML

    <form class="form-vertical linkage-form" id="J_LinkageForm">
        <div class="control-group">
            <div class="controls">
                <div>
                    <select name="" id="province">
                        <option value="">省份</option>
                        <option value="">浙江</option>
                    </select>
                </div>
                <div class="J_Linkage" condition="#province">
                    <select name="" id="city">
                        <option value="">城市</option>
                        <option value="">杭州</option>
                    </select>
                </div>
                <div class="J_Linkage" condition="#city">
                    <select name="" id="area">
                        <option value="">地区</option>
                        <option value="">西湖区</option>
                    </select>
                </div>
            </div>
        </div>
    </form>

### 初始化组件

    S.use('gallery/linkage/1.0/index', function (S, Linkage) {
            var linkage = new Linkage('#J_LinkageForm');
            linkage.render();
    })

Linkage()第一个参数指向包含联动关系元素的父容器。

## 使用说明

    <div class="J_Linkage" condition="#province">

    </div>

所有联动的元素需要加上*J_Linkage* class名。
*condition* 属性指的是联动条件，用法举例：

*condition="#city"* 联动源元素为id为city的元素，联动的默认事件，组件会自动处理，比如select自动处理成*change*。

*condition="#city:click"* 表示联动事件为*click*。

*action* 属性为联动逻辑处理函数，默认为*show*，即显示联动元素，您可以自己定义联动函数，比如：

    Linkage.popup = function ($target,$srcNode) {
        //联动逻辑写在这里
    };

联动函数必须挂在Linkage类下。

* $target为联动元素
* $srcNode为源元素
