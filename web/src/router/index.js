import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout, { ConnectionLayout, SettingsLayout } from '@/layouts'
import Home from '@/pages/Home.vue'
import Connections, { CreateConnection, EditConnection } from '@/pages/settings/connections'
import Policies, {
  CreatePolicy,
  EditPolicy,
  AlterPolicyAddColumn,
  AlterPolicyModifyExpression,
  Columns as RedactionColumns
} from '@/pages/policies'
import Expressions, { CreateExpression, EditExpression } from '@/pages/expressions'
import Categories, { EditCategory, CreateCategory } from '@/pages/categories'
import Login from '@/pages/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth/login',
    component: Login
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      { name: 'home', path: '', component: Home },
      {
        path: '/settings',
        component: SettingsLayout,
        children: [
          {
            name: 'createConnection',
            path: 'connections/create',
            component: CreateConnection
          },
          {
            name: 'editConnection',
            path: 'connections/:id/edit',
            component: EditConnection,
            props: true
          }, {
            name: 'connections',
            path: 'connections',
            component: Connections
          }
        ]
      }, {
        name: 'connectionsLayout',
        path: '/connections/:connectionId',
        props: true,
        component: ConnectionLayout,
        redirect: '/connections/:connectionId/expressions',
        children: [{
          name: 'redactionColumns',
          path: '/connections/:connectionId/policies/columns',
          props: true,
          component: RedactionColumns,
          meta: { group: 'policies', title: 'Redaction Columns' }
        }, {
          name: 'alterPolicyAddColumn',
          path: '/connections/:connectionId/policies/columns/add',
          props: true,
          component: AlterPolicyAddColumn,
          meta: { group: 'policies', title: 'Add Column' }
        }, {
          name: 'alterPolicyModifyExpression',
          path: '/connections/:connectionId/policies/columns/modify-expression',
          props: true,
          component: AlterPolicyModifyExpression,
          meta: { group: 'policies', title: 'Modify Expression' }
        }, {
          name: 'policies',
          path: '/connections/:connectionId/policies',
          props: true,
          component: Policies,
          meta: { group: 'policies', title: 'Policies' }
        }, {
          name: 'editPolicy',
          path: '/connections/:connectionId/policies/edit',
          props: true,
          component: EditPolicy,
          meta: { group: 'policies', title: 'Edit Policy' }
        }, {
          name: 'createPolicy',
          path: '/connections/:connectionId/policies/create',
          props: true,
          component: CreatePolicy,
          meta: { group: 'policies', title: 'Create Policy' }
        }, {
          name: 'expressions',
          path: '/connections/:connectionId/expressions',
          props: true,
          component: Expressions,
          meta: { group: 'expressions', title: 'Expressions' }
        }, {
          name: 'createExpression',
          path: '/connections/:connectionId/expressions/create',
          props: true,
          component: CreateExpression,
          meta: { group: 'expressions', title: 'Create Expression' }
        }, {
          name: 'editExpression',
          path: '/connections/:connectionId/expressions/:policy_expression_name',
          props: true,
          component: EditExpression,
          meta: { group: 'expressions', title: 'Edit Expression' }
        }, {
          name: 'categories',
          path: '/connections/:connectionId/categories',
          props: true,
          component: Categories,
          meta: { group: 'categories', title: 'Categories' }
        }, {
          name: 'createCategory',
          path: '/connections/:connectionId/categories/create',
          props: true,
          component: CreateCategory,
          meta: { group: 'categories', title: 'Create Category' }
        }, {
          name: 'editCategory',
          path: '/connections/:connectionId/categories/:id',
          props: true,
          component: EditCategory,
          meta: { group: 'categories', title: 'Edit Category' }
        }]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  // Vite exposes env variables on the special import.meta.env object
  base: process.env.BASE_URL,
  routes
})

export default router
