export default function ({ store, redirect }) {
  if (!Object.keys(store.getters.user).length) {
    redirect('/?message=noUser')
  }
}
