describe('auth0 login', () => {
  it('login using auth0', () => {
    const options = {
        method: 'POST',
        url: Cypress.env('auth_url'),
    
        body: {
          grant_type: 'password',
          username: Cypress.env('auth_username'),
          password: Cypress.env('auth_password'),
          audience: Cypress.env('auth_audience'),
          scope: 'openid profile email',
          client_id: Cypress.env('auth_client_id'),
          client_secret: Cypress.env('auth_client_secret'),       
        }
    }
    cy.request(options);

    cy.visit('http://localhost:3000');
    cy.contains('Login');
    cy.contains('Sign up');  
  })
});

