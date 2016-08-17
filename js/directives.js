/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
MetronicApp.directive('ngSpinnerBar', ['$rootScope',
    function($rootScope) {
        return {
            link: function(scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide'); // show spinner bar
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function() {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu

                    // auto scorll to page top
                    setTimeout(function() {
                        App.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

// Handle global LINK click
MetronicApp.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});

// Handle Dropdown Hover Plugin Integration
MetronicApp.directive('dropdownMenuHover', function() {
    return {
        link: function(scope, elem) {
            elem.dropdownHover();
        }
    };
});

// 单个页面显示条目数选择
MetronicApp.directive('pagePerCounter', function() {
    return {
        restrict: 'E',
        templateUrl: 'tpl/pagePerCounter.html',
        link: function(scope, elem) {
            scope.pages = [
                {name:'10',id:10},
                {name:'20',id:20},
                {name:'50',id:50},
                {name:'100',id:100}
            ];
        }
    };
});

// icheck 插件
MetronicApp.directive('icheck', function($timeout, $parse) {
    return {
        link: function($scope, element, $attrs) {
            return $timeout(function() {
                var ngModelGetter, value;
                ngModelGetter = $parse($attrs['ngModel']);
                value = $parse($attrs['ngValue'])($scope);
                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green',
                    increaseArea: '20%'
                }).on('ifChanged', function(event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function() {
                            return ngModelGetter.assign($scope, event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function() {
                            return ngModelGetter.assign($scope, value);
                        });
                    }
                });
            });
        }
    };
});

// input url 验证
MetronicApp.directive('myValidUrl', [function() {
    return {
        require: "ngModel",
        link: function(scope, element, attr, ngModel) {
            if (ngModel) {
                var urlRegexp = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/i;
            }
            var customValidator = function(value) {
                var validity = ngModel.$isEmpty(value) || urlRegexp.test(value);
                ngModel.$setValidity("myValidUrl", validity);
                return validity ? value : false;
            };
            ngModel.$formatters.push(customValidator);
            ngModel.$parsers.push(customValidator);
        }
    };
}]);

// 只允许输入英文字母和数字
MetronicApp.directive('myOnlyNumberLetter', [function() {
    return {
        require: "ngModel",
        link: function(scope, element, attr, ngModel) {
            function fromUser(text) {
                   if (text) {
                       var transformedInput = text.replace(/[^0-9a-zA-Z]/g, '');

                       if (transformedInput !== text) {
                           ngModel.$setViewValue(transformedInput);
                           ngModel.$render();
                       }
                       return transformedInput;
                   }
                   return undefined;
            }
            ngModel.$parsers.push(fromUser);

        }
    };
}]);

// 只允许输入数字
MetronicApp.directive('myOnlyNumber', [function() {
    return {
        require: "ngModel",
        link: function(scope, element, attr, ngModel) {
            function fromUser(text) {
                   if (text) {
                       var transformedInput = text.replace(/[^0-9\.]/g, '');
                      // var transformedInput = text.replace(/^\+?(\d*\.\d{3})$/g, '');

                       if (transformedInput !== text) {
                           ngModel.$setViewValue(transformedInput);
                           ngModel.$render();
                       }
                       return transformedInput;
                   }
                   return undefined;
            }
            ngModel.$parsers.push(fromUser);

        }
    };
}]);

// 搜索筛选
MetronicApp.directive('leenFilterSearch', [function() {
    return {
        link: function(scope, element, attr) {
            
        }
    };
}]);

