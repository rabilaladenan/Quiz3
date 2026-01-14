describe('Tugas 18 - API Testing reqres.in', () => {
  const baseUrl = 'https://reqres.in/api'

    it('TC01 - GET List Users', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users?page=2`,
            headers: {
                'x-api-key': 'reqres_557ffc38913d4a2a830c74853f7087ad'
            }        
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data).to.be.an('array')
        })
    })

    it('TC02 - GET Single User', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users/1`,
            headers: {
                'x-api-key': 'reqres_557ffc38913d4a2a830c74853f7087ad'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data).to.have.property('id', 1)
        })
    })

    it('TC03 - POST Create User', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/users`,
            headers: {
                'x-api-key': 'reqres_557ffc38913d4a2a830c74853f7087ad'
            },
            body: {
                name: 'Rabilal',
                job: 'QA Tester'
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq('Rabilal')
            expect(response.body.job).to.eq('QA Tester')
        })
    })

    it('TC04 - PUT Update User', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/users/1`,
            headers: {
                'x-api-key': 'reqres_557ffc38913d4a2a830c74853f7087ad'
            },
            body: {
                name: 'Rabilal Adenan',
                job: 'Senior QA Tester'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq('Rabilal Adenan')
            expect(response.body.job).to.eq('Senior QA Tester')
        })
    })

    it('TC05 - PATCH Update User', () => {
        cy.request({
            method: 'PATCH',
            url: `${baseUrl}/users/1`,
            headers: {
                'x-api-key': 'reqres_557ffc38913d4a2a830c74853f7087ad'
            },
            body: {
                job: 'Project Manager'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.job).to.eq('Project Manager')
        })
    })

    it('TC06 - DELETE User', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/users/1`,
            headers: {
                'x-api-key': 'reqres_557ffc38913d4a2a830c74853f7087ad'
            }
        }).then((response) => {
            expect(response.status).to.eq(204)
        })
    })

    it('TC07 - POST Register failed', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/register`,
            headers: {
                'x-api-key': 'reqres_557ffc38913d4a2a830c74853f7087ad'
            },
            failOnStatusCode: false,
            body: {
                email: 'sydney@fife'
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('error', 'Missing password')
        })
    })
})