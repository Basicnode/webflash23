describe('登录接口测试',()=>{
    it('正确的用户名密码,可以正常登录成功',()=>{
        cy.request({method:'POST',
            url:'/prod-api/account/login',
            form:true,
            body:{username:'developer',password:'developer'}})
            .its('body').should('contain',{code: 20000, msg: "成功"})
    })

    it('错误的用户名密码,提示登录失败',()=>{
        cy.request({method:'POST',
            url:'/prod-api/account/login',
            form:true,
            body:{username:'huice001',password:'huice001'}})
            .its('body').should('contain',{code:9999, msg:"登录时失败"})
    })
})