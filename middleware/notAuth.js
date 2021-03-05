export default function({ store, redirect }){
    if(localStorage.getItem('currentUser')){
        store.commit('auth/SET_CURRENT_USER', JSON.parse(localStorage.getItem('currentUser')))
    }
    if(store.state.auth.currentUser != null){
        return redirect('/')
    }
}