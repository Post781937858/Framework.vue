/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    webSocket: null,
    // websocket url
    lockReconnect: false,
    socketclose: false,
    carerror: {},
    timer: {},
    msgevent: {} // 数据帧
  },
  getters: {
    getMsg(state) {
      return state.msgevent
    }
  },
  mutations: {
    // 创建websocket连接
    WEBSOCKET_INIT(state) {
      try {
        console.log('webSocket创建')
        window.clearInterval(state.timer)
        const host = document.location.protocol === 'https:' ? 'wss' : 'ws' + '://' + document.location.hostname + ':' + api.port + '/ws' + '?token=' + localStorage.getItem('Authorization')
        console.log(host)
        if ('WebSocket' in window) {
          state.socketclose = false
          state.webSocket = new WebSocket(host)
          this.commit('initEventHandle')
          //   state.timer = setInterval(() => {

          //   }, 3000)
        } else {
          alert('当前浏览器不支持websocket协议,建议使用现代浏览器', 3000)
        }
      } catch (e) {
        this.commit('reconnect')
      }
    },
    // 消息发送
    WEBSOCKET_SEND(state, data) {
      if (state.webSocket.readyState === state.webSocket.CLOSED) return
      state.webSocket.send(data)
    },
    // 断线重连
    reconnect(state) {
      if (state.lockReconnect || state.socketclose) return
      state.lockReconnect = true
      console.log('尝试重新连接')
      var that = this
      setTimeout(function () { // 设置延迟避免请求过多
        state.webSocket.close()
        that.commit('WEBSOCKET_INIT')
        state.lockReconnect = false
      }, 8000)
    },
    // 事件绑定
    initEventHandle(state) {
      var that = this
      // 连接成功事件
      state.webSocket.onopen = function (event) {
        console.log('webSocket连接成功')
      }
      // 连接关闭事件
      state.webSocket.onclose = () => {
        this.commit('reconnect')
      }
      // 异常事件
      state.webSocket.onerror = () => {
        this.commit('reconnect')
      }
      // 消息接收事件
      state.webSocket.onmessage = (event) => {
        state.msgevent = event
        // console.log(event.data)
      }
      state.timer = setInterval(() => {
        // that.commit('WEBSOCKET_SEND', JSON.stringify({ Command: 1 }))
        that.commit('WEBSOCKET_SEND', JSON.stringify({
          Command: 0,
          megType: 'heartbeat'
        }))
      }, 1000)
    },
    webSocketclose(state) {
      console.log('webSocket关闭')
      state.socketclose = true
      window.clearInterval(state.timer)
      state.webSocket.close()
    }
  },
  actions: {
    WEBSOCKET_INIT({
      commit
    }) {
      commit('WEBSOCKET_INIT')
    },
    WEBSOCKET_SEND({
      commit
    }, data) {
      commit('WEBSOCKET_SEND', data)
    },
    webSocketclose({
      commit
    }) {
      commit('webSocketclose')
    }
  }
})
