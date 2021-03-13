// const serverBaseUrl =
//   import.meta.env.VITE_SERVER_BASE_URL || 'https://td-server-bookstore.herokuapp.com';
export const SERVER_LINKS = {
  authRefresh: '/api/auth/refresh', // POST
  authAutoRefresh: '/api/auth/auto-refresh',
  authLogin: '/api/auth/login', // POST with body {userOrEmail, password}
  authRegister: '/api/auth/register', // POST with body {username, email, password}
  authActivate: '/api/auth/activate', //GET with query ?token=
  authMe: '/api/auth', // GET
  authForgotPassword: '/api/auth/forgot-password', //POST with body {email}
  authResetPassword: '/api/auth/reset-password', // GET with body {token, newPassword}
  authLogout: '/api/auth', // DELETE
  userAddToCart: '/api/users/purchase', // POST
  userUpdateCart: '/api/users/update-cart-item', // POST
  userRemoveFromCart: '/api/users/remove-cart-item', // POST
  userRemoveAllFromCart: '/api/users/remove-carts', // POST
  userUpload: '/api/users/upload', // POST with param {file: FileType}
  bookGetById: '/api/books/book', //GET with param /:id
  bookGetByGenre: '/api/books/genre', // GET with param /:genre
  bookSearch: '/api/books/search', // GET with query ?q=
  bookQuery: '/api/books/query', // GET with query ?q=
};
