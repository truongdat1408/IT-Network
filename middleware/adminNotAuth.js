export default function ({ store, redirect }) {
  if(localStorage.getItem('currentUser')) { 
    store.commit('auth/SET_CURRENT_USER', JSON.parse(localStorage.getItem('currentUser')))
  }
  if (store.state.auth.currentUser != null) {
    let user = store.state.auth.currentUser
    if(user.roleId == 1 || user.role == 2) {
      return redirect('/admin/user')
    }
    else {
      return redirect('/')
    }
  }
}
