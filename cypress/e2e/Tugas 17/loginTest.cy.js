import LoginPage from './loginPage.cy'
import { loginData } from './loginData.cy'

const loginPage = new LoginPage()

describe('Tugas 17 - Login with POM', () => {
    beforeEach(() => {
        loginPage.visit()
    })

    it('LS001 - Login success', () => {
        loginPage.inputUsername(loginData.valid.username)
        loginPage.inputPassword(loginData.valid.password)
        loginPage.clickLogin()
        cy.url().should('include', '/dashboard')
    })

    it('LF001 - Username & Password salah', () => {
        loginPage.inputUsername(loginData.invalid.username)
        loginPage.inputPassword(loginData.invalid.password)
        loginPage.clickLogin()
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
    })

    it('LF002 - Username benar & Password salah', () => {
        loginPage.inputUsername(loginData.valid.username)
        loginPage.inputPassword(loginData.invalid.password)
        loginPage.clickLogin()
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
    })

    it('LF003 - Username salah & Password benar', () => {
        loginPage.inputUsername(loginData.invalid.username)
        loginPage.inputPassword(loginData.valid.password)
        loginPage.clickLogin()
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
    })

    it('LF005 - Username & Password kosong', () => {
        loginPage.clickLogin()
        cy.contains('Required').should('be.visible')
    })

    it('FP001 - Forgot Password Link', () => {
        loginPage.clickForgotPassword()
        cy.url().should('include', 'requestPasswordResetCode')
    })
})