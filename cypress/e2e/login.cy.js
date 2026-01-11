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
    cy.get('button[type="submit"]').click()

    cy.contains('Dashboard').should('be.visible')
  })

  it('LF001 - User & Password salah', () => {
    cy.get('input[name="username"]').should('be.visible')

    cy.get('input[name="username"]').type('Admin123')
    cy.get('input[name="password"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('LF002 - User benar Password salah', () => {
    cy.get('input[name="username"]').should('be.visible')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('LF003 - User salah Password benar', () => {
    cy.get('input[name="username"]').should('be.visible')

    cy.get('input[name="username"]').type('Admin123')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('LF004 - User & Password belum terdaftar', () => {
    cy.get('input[name="username"]').should('be.visible')

    cy.get('input[name="username"]').type('client')
    cy.get('input[name="password"]').type('client')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('LF005 - User Benar Password kosong', () => {
    cy.get('input[name="username"]').should('be.visible')

    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('FP001 - Menggunakan fitur forgot password', () => {
    cy.get('input[name="username"]').should('be.visible')

    cy.contains('Forgot your password?').click()

    cy.url().should('include', 'requestPasswordResetCode')
  })
})