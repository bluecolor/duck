/* eslint-disable camelcase */

import api from '@/api/redact/redaction'

const state = {
}

const getters = {
}

const actions = {
  askRedactionColumns ({ rootGetters }, payload) {
    return api.askColumns(rootGetters['app/connectionId'], payload)
  },
  askRedactionInfo ({ rootGetters }, params) {
    return api.askInfo(rootGetters['app/connectionId'], params)
  }
}

const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}