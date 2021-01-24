import 'faker'
describe('添加栏目',()=>{
    it('栏目数据合法，添加成功',()=>{
        cy.login('developer','developer').then(res=>{
            //新增
            cy.request({method:'POST',
                url:'/prod-api/channel?id=&name=蓝马.&code=20123',
                headers:{Authorization:res.body.data.token}})
                .its
                ('body').should('contain',{"code":20000,"msg":"成功"})
            cy.wait(1000)
            //修改
            cy.request({method:'POST',
                url:'/prod-api/channel?id=13&name=蓝马啤酒厂123&code=20123',
                headers:{Authorization:res.body.data.token}})
                .its
                ('body').should('contain',{"code":20000,"msg":"成功"})
            cy.wait(5000)
            //删除
            cy.request({method:'DELETE',
                url:'/prod-api/channel?id=13',
                headers:{Authorization:res.body.data.token}})
                .its
                ('body').should('contain',{"code":20000,"msg":"成功"})
        })
    })

})
