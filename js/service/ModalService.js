angular.module('MetronicApp').factory('ModalService', ['$http', '$uibModal', '$q', function($http, $uibModal, $q) {
    var modalService = {};
    modalService.currentModalInstance = {};

    modalService.open = function( parentScope, templateUrl, initFn, okFn, cancelFn, resolve, backdrop) {
        $uibModal.open({
            animation: true,
            backdrop: backdrop || 'static',
            templateUrl: templateUrl,
            scope: parentScope,
            controller: function($modalInstance, $scope) {
                modalService.currentModalInstance = $modalInstance;
                // $scope.title = title;
                // $scope.formData = formData;

                initFn && initFn($scope);
                $scope.cancel = cancelFn ||function() {
                    $modalInstance.dismiss('cancel');
                };

                $scope.post = okFn || function(newData) {
                    $modalInstance.dismiss('cancel');
                }

            },
            resolve: resolve || {}
        });
    };

    modalService.confirm = function(option, okFun) {

        $uibModal.open({
            animation: true,
            backdrop: 'static',
            template: '<div class="modal-header ng-scope">'
                        +'<h3 class="modal-title">{{title || "提示"}}</h3>'
            +'</div>'
            +'<div class="modal-body ng-scope">'
            +'    <p>{{ body ||  "您确定吗?" }}</p>'
            +'</div>'
            +'<div class="modal-footer ng-scope">'
            +'    <button class="btn btn-primary" type="button" ng-click="ok()">{{ okStr || "确定"}}</button>'
            +'    <button class="btn btn-warning" type="button" ng-click="cancel()">{{ cancelStr || "取消"}}</button>'
            +'</div>',
            controller: function($modalInstance, $scope) {
                modalService.currentModalInstance = $modalInstance;

                $scope.title = option.title || "提示";
                $scope.body = option.body || "您确定吗?";
                $scope.ok = option.okStr || "确定";
                $scope.cancel = option.cancelStr || "取消";

                option.initFn && option.initFn($scope);

                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                    return false;
                };

                $scope.ok = function() {
                    okFun && okFun();
                    $modalInstance.dismiss('cancel');
                    return true;
                }
            },
            resolve: option.resolve || {}
        });
    }

    modalService.alert = function(option, okFun) {
        $uibModal.open({
            animation: true,
            backdrop: 'static',
            template: '<div class="modal-header ng-scope">'
                        +'<h3 class="modal-title">{{title || "提示"}}</h3>'
            +'</div>'
            +'<div class="modal-body ng-scope">'
            +'    <p>{{ body ||  "您确定吗?" }}</p>'
            +'</div>'
            +'<div class="modal-footer ng-scope">'
            +'    <button class="btn btn-primary" type="button" ng-click="ok()">{{"确定"}}</button>'
            +'</div>',
            controller: function($modalInstance, $scope) {
                modalService.currentModalInstance = $modalInstance;

                $scope.title = option.title || "提示";
                $scope.body = option.body || "您确定吗?";
                $scope.ok = option.okStr || "确定";
                option.initFn && option.initFn($scope);

                $scope.ok = function() {
                    okFun && okFun();
                    $modalInstance.dismiss('cancel');
                    return true;
                }
            },
            resolve: option.resolve || {}
        });
    }

    modalService.close = function() {
        modalService.currentModalInstance.dismiss('cancel');
    }

    return modalService;
}]);
