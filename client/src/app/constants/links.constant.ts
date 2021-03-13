const serverBaseUrl =
  import.meta.env.VITE_SERVER_BASE_URL || 'https://td-server-bookstore.herokuapp.com';
export const SERVER_LINKS = {
  authRefresh: serverBaseUrl + '/api/auth/refresh', // POST
  authAutoRefresh: serverBaseUrl + '/api/auth/auto-refresh',
  authLogin: serverBaseUrl + '/api/auth/login', // POST with body {userOrEmail, password}
  authRegister: serverBaseUrl + '/api/auth/register', // POST with body {username, email, password}
  authActivate: serverBaseUrl + '/api/auth/activate', //GET with query ?token=
  authMe: serverBaseUrl + '/api/auth', // GET
  authForgotPassword: serverBaseUrl + '/api/auth/forgot-password', //POST with body {email}
  authResetPassword: serverBaseUrl + '/api/auth/reset-password', // GET with body {token, newPassword}
  authLogout: serverBaseUrl + '/api/auth', // DELETE
  userAddToCart: serverBaseUrl + '/api/users/purchase', // POST
  userUpdateCart: serverBaseUrl + '/api/users/update-cart-item', // POST
  userRemoveFromCart: serverBaseUrl + '/api/users/remove-cart-item', // POST
  userRemoveAllFromCart: serverBaseUrl + '/api/users/remove-carts', // POST
  userUpload: serverBaseUrl + '/api/users/upload', // POST with param {file: FileType}
  bookGetById: serverBaseUrl + '/api/books/book', //GET with param /:id
  bookGetByGenre: serverBaseUrl + '/api/books/genre', // GET with param /:genre
  bookSearch: serverBaseUrl + '/api/books/search', // GET with query ?q=
  bookQuery: serverBaseUrl + '/api/books/query', // GET with query ?q=
};
