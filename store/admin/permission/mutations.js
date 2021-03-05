export default {
    SET_LIST(state, data) {
      state.list = data
    },

    REMOVE_LIST(state) {
      state.list = []
    },
  
    SET_LOADING(state, status) {
      state.loading = status
    },

    SET_QUERY(state, query) {
      state.query = { ...query}
    },

    SET_PERMISSION(state, data) {
      state.permissionPosession = data
    },

    PUSH_PERMISSION_ROLE(state, data) {
      state.permissionPosession.push(data)
    },

    SET_PERMISSION_ROLE(state, object) {
      let element = state.permissionPosession.find(e => e.permissionId == object.permissionId)
      if(element) {
        element.possession = object.possession
      }
    }, 
    
    REMOVE_PERMISSION_ROLE(state, object) {
      state.permissionPosession = state.permissionPosession.filter(e => e.permissionId != object.permissionId)
    }, 

    RESET_PERMISSION_ROLE(state) {
      state.permissionPosession = []
    }
  }