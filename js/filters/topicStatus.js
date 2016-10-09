/**
 * Created by Administrator on 2016/9/21.
 */
angular.module('MetronicApp').filter('filterStatus', [function () {
    return function (input) {
        return {
            "PENDING": '审核中',
            "NOPASS": '未通过',
            "START": '启用',
            "STOP": '禁用'
        }[input]
    }
}]).filter('responseStatus', [function () {
    return function (input) {
        return {
            "SUCCESS": "响应成功",
            "ERROR": "响应错误"
        }[input]
    }
}]).filter('checkStatus', [function () {
    return function (input) {
        return {
            "PASSED": "审核通过",
            "NOPASS": "未通过",
            "UNCHECK": "未审核"
        }[input]
    }
}]).filter('messageStatus', [function () {
    return function (input) {
        return {
            "ENQUEUE": "入队",
            "ACCEPTED": "受理",
            "WAITING": "等待",
            "PROCESSING": "处理中",
            "FINISH_SUCCESS": "成功",
            "ACCEPTED": "失败",
            "FINISH_ERROR": "错误"
        }[input]
    }
}]).filter('logType', [function () {
    return function (input) {
        return {
            "BORN_MESSAGE": "消息生成",
            "RECEIVE_MESSAGE": "消息接收",
            "SAVE_MESSAGE": "消息DB持久化",
            "ENQUEUE_MESSAGE": "消息入队",
            "WAIT_ENQUEUE_MESSAGE": "消息等待入队",
            "DEQUEUE_MESSAGE": "消息出队",
            "DELIVERY_MESSAGE": "消息投递",
            "END_MESSAGE": "消息结束",
            "NOTIFY_MESSAGE": "消息通知"
        }[input]
    }
}]).filter('subscribeStatus', [function () {
    return function (input) {
        return {
            "START": "启用",
            "STOP": "禁用",
            "FAILED": "失败"
        }[input]
    }
}]).filter('routeType', [function () {
    return function (input) {
        return {
            "CONSUME": "消费",
            "NOTIFY": "通知"
        }[input]
    }
}]);