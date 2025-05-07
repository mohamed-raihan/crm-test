const API_URL = {
    AUTH: {
      REGISTER: "/api/register/",
      LOGIN: "/api/login/",
      FORGOT_PASSWORD:"/api/change-password/"
    },
    USERS: {
      GET_USERS: "/api/users/",
      POST_USERS: "/api/users/",
      USER_PATCH: (id) => `/api/users/${id}/`,
      DELETE_USERS: (id) => `/api/users/${id}/`,
    },

    TAX: {
      GET_TAX: "/api/tax/",
      POST_TAX: "/api/tax/",
      PATCH_TAX: (id) => `/api/tax/${id}/`,
      DELETE_TAX: (id) => `/api/tax/${id}/`,
    },
    BRANCH: {
      GET_BRANCH: "/api/branches/",
      GET_MANAGER: `/api/users/role/2/`,
      POST_BRANCH: "/api/branches/",
      PATCH_BRANCH:id=> `/api/branches/${id}/`,
      DELETE_BRANCH:id=> `/api/branches/${id}/`
    },

    CUSTOMER: {
      GET_CUSTOMER: "/api/customers/",
      POST_CUSTOMER: "/api/customers/",
      PATCH_CUSTOMER:id=> `/api/customers/${id}/`,
      DELETE_CUSTOMER:id=> `/api/customers/${id}/`
    },

    NOMINEE: {
      GET_NOMINEE: "/api/nominees/",
      POST_NOMINEE: "/api/nominees/",
      PATCH_NOMINEE:id=> `/api/nominees/${id}/`,
      DELETE_NOMINEE:id=> `/api/nominees/${id}/`
    },

    PAYMENT: {
      GET_PAYMENT: "/api/payments/",
      POST_PAYMENT: "/api/payments/",
      PATCH_PAYMENT:id=> `/api/payments/${id}/`,
      DELETE_PAYMENT:id=> `/api/payments/${id}/`
    },

    POLICY: {
      GET_POLICY: "/api/policy/",
      POST_POLICY: "/api/policy/",
      PATCH_POLICY:id=> `/api/policy/${id}/`,
      DELETE_POLICY:id=> `/api/policy/${id}/`
    },

    PLAN_COVERAGE:{
      GET_PLAN_COVERAGE: "/api/plan-coverage/",
      POST_PLAN_COVERAGE: "/api/plan-coverage/",
      PATCH_PLAN_COVERAGE:id=> `/api/plan-coverage/${id}/`,
      DELETE_PLAN_COVERAGE:id=> `/api/plan-coverage/${id}/`
    },

    PLANS:{
      GET_PLAN: "/api/plan/",
      POST_PLAN: "/api/plan/",
      PATCH_PLAN:id=> `/api/plan/${id}/`,
      DELETE_PLAN:id=> `/api/plan/${id}/`
    },

    AGENTS: {
      GET_AGENT: "/api/agent/",
      POST_AGENT: "/api/agent/",
      PATCH_AGENT:id=> `/api/agent/${id}/`,
      DELETE_AGENT:id=> `/api/agent/${id}/`,
    },

    AGENT_COMMISSION:{
      GET_COMMISSION:"/api/agent-commissions/",
      POST_COMMISSION:"/api/agent-commissions/",
      PATCH_COMMISSION:id=> `/api/agent-commissions/${id}/`,
      DELETE_COMMISSION:id=> `/api/agent-commissions/${id}/`,
    },

    AGENTS_INSENTIVE:{
      GET_INSENTIVE:"/api/agent-incentives/"
    },

    USERROLE :{
      GET_ROLE : '/api/roles/'
    },
    COMPANY: {
      GET_COMPANY: "/api/companies/",
      POST_COMPANY: "/api/companies/",
      PATCH_COMPANY:id=> `/api/companies/${id}/`,
      DELETE_COMPANY:id=> `/api/companies/${id}/`
    },

    COMMISSION:{
      GET_COMMISSION:"/api/agent_commission/",
      POST_COMMISSION:"/api/agent_commission/",
      PATCH_COMMISSION:id=>`/api/agent_commission/${id}`,
      DELETW_COMMISSION:id=>`/api/agent_commission/${id}`
    },
    POLICY_CATEGORY: {
      GET_CATEGORY: "/api/policy-categories/",
      POST_CATEGORY: "/api/policy-categories/",
      PATCH_CATEGORY:id=> `/api/policy-categories/${id}/`,
      DELETE_CATEGORY:id=> `/api/policy-categories/${id}/`,
    },
    POLICY_TYPE: {
      GET_POLICY_TYPE: "/api/policy_type/",
      POST_POLICY_TYPE: "/api/policy_type/",
      PATCH_POLICY_TYPE:id=> `/api/policy_type/${id}/`,
      DELETE_POLICY_TYPE:id=> `/api/policy_type/${id}/`
    },
    POLICIES: {
      GET_POLICIES:"/api/policies/",
      POST_POLICIES:"/api/policies/",
      PATCH_POLICIES:id=> `/api/policies/${id}/`,
      DELETE_POLICIES:id=> `/api/policies/${id}/`
    },
    FAMILY_MEMBERS: {
      GET_MEMBERS:"/api/members/",
      POST_MEMBERS:"/api/members/",
      PATCH_MEMBERS:id=>`/api/members/${id}/`,
      DELETE_MEMBERS:id=>`/api/members/${id}/`,
    },

    COMPANY_COUNT:{
       COMPANY_TOTAL_CUSTOMER:id=>`/api/company/${id}/policies/`,

     },

    POLICY_COUNT:"/api/policy-count/",
    
  };
  
  export default API_URL;
  