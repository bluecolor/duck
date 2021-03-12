/* eslint-disable camelcase */

import _ from 'lodash'
import api from '@/api/plan'

const SET_PLANS = 'SET_PLANS'
const CREATE = 'CREATE'
const UPDATE = 'UPDATE'
const DELETE = 'DELETE'
const SET_STATUS = 'SET_STATUS'

const state = {
  plans: []
}

const getters = {
  plans: state => state.plans
}

const actions = {
  getPlans ({ commit, rootGetters }) {
    return api.getAll(rootGetters['app/connectionId']).then(result => {
      commit(SET_PLANS, result)
      return result
    })
  },
  getPlan ({ rootGetters }, id) {
    return api.getOne(rootGetters['app/connectionId'], id)
  },
  createPlan ({ commit, rootGetters }, payload) {
    return api.create(rootGetters['app/connectionId'], payload).then(result => {
      commit(CREATE, result)
      return result
    })
  },
  updatePlan ({ commit, rootGetters }, payload) {
    const { id } = payload
    return api.update(rootGetters['app/connectionId'], id, payload).then(result => {
      commit(UPDATE, result)
      return result
    })
  },
  deletePlan ({ commit, rootGetters }, id) {
    return api.delete(rootGetters['app/connectionId'], id).then(result => {
      commit(DELETE, id)
      return result
    })
  },
  runPlan ({ commit, rootGetters }, id) {
    return api.run(rootGetters['app/connectionId'], id).then(result => {
      commit(SET_STATUS, result)
      return result
    })
  }
}

const mutations = {
  [SET_PLANS]: (state, data) => {
    state.plans = data
  },
  [CREATE]: (state, data) => {
    state.plans.push(data)
  },
  [UPDATE]: (state, data) => {
    const { id } = data
    const i = _.findIndex(state.plans, { id })
    if (i > -1) {
      state.plans.splice(i, 1, data)
    }
  },
  [DELETE]: (state, id) => {
    const i = _.findIndex(state.plans, { id })
    if (i > -1) {
      state.plans.splice(i, 1)
    }
  },
  [SET_STATUS]: (state, { id, status }) => {
    const plan = _.find(this.plans, { id })
    plan.status = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
