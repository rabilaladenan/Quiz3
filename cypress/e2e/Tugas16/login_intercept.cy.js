describe('OrangeHRM Login Feature', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })
  
  it('LS001 - User & Password benar', () => {
    cy.get('input[name="username"]').should('be.visible')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary')

    cy.get('button[type="submit"]').click()

    cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)
  })

  it('LF001 - User & Password salah', () => {   
    cy.get('input[name="username"]').should('be.visible')

    cy.get('input[name="username"]').type('Admin123')
    cy.get('input[name="password"]').type('Admin')

    cy.intercept('POST', '**/auth/validate', {
      statusCode: 401,
      body: { message: 'Invalid credentials' }
    }).as('invalidCredentials')

    cy.get('button[type="submit"]').click()

    cy.wait('@invalidCredentials')
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('LF002 - User benar Password salah', () => {
    cy.get('input[name="username"]').should('be.visible')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('Admin')
    
    cy.intercept('POST', '**/auth/validate', {
      statusCode: 403,
      body: { message: 'Wrong password' }
    }).as('wrongPassword')
    
    cy.get('button[type="submit"]').click()

    cy.wait('@wrongPassword').its('response.statusCode').should('eq', 403)
  })

  it('LF003 - User salah Password benar', () => {
    cy.get('input[name="username"]').should('be.visible')

    cy.get('input[name="username"]').type('Admin123')
    cy.get('input[name="password"]').type('admin123')

    cy.intercept('POST', '**/auth/validate', {
      statusCode: 404,
      body: { message: 'User not found' }
    }).as('userNotFound')

    cy.get('button[type="submit"]').click()

    cy.wait('@userNotFound').its('response.statusCode').should('eq', 404)
  })

  it('LF005 - User & Password kosong', () => {
    cy.get('input[name="username"]').should('be.visible')

    cy.intercept('POST', '**/auth/validate', {
      statusCode: 400,
      body: { message: 'Username & Password Blank' }
    }).as('blankField')
    
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('FP001 - Menggunakan fitur forgot password', () => {
    cy.get('input[name="username"]').should('be.visible')

    cy.intercept('GET', '**/auth/requestPasswordResetCode')
    .as('forgotPassword')
    
    cy.contains('Forgot your password?').click()

    cy.wait('@forgotPassword').its('response.statusCode').should('eq', 200)
  })
})