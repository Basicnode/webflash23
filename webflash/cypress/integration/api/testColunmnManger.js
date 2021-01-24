import faker from 'faker'
faker.setLocale('zh_CN')
describe('添加栏目',()=>{
    it('栏目数据合法，添加成功',()=>{
        cy.login('developer','developer').then(res=>{
            //新增
            cy.request({method:'POST',
                url:'/prod-api/channel?id=&name=' + faker.name.firstName() + faker.name.lastName()+ '&code=' + faker.random.number(),
                headers:{Authorization:res.body.data.token}})
                .its
                ('body').should('contain',{"code":20000,"msg":"成功"})
            /*
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

             */
        })
    })

    it('栏目名称为空，编码不为空，‘提示400错误和名称不能为空‘',()=>{
        cy.login('developer','developer').then(res=>{
            //新增
            cy.request({method:'POST',
                url:'/prod-api/channel?id=&name=&code='+faker.random.number(),
                headers:{Authorization:res.body.data.token},failOnStatusCode:false}).then(res=>{
                    expect(res.body.errors[0].defaultMessage).to.contain('名称不能为空')
                    expect(res.body.status).to.equal(400)

            })

        })
    })

    it('栏目名称不为空，编码为空，‘提示400错误和编不能为空‘',()=>{
        cy.login('developer','developer').then(res=>{
            //新增
            cy.request({method:'POST',
                url:'/prod-api/channel?id=&name='+ faker.name.firstName() + faker.name.lastName() +'&code=',
                headers:{Authorization:res.body.data.token},failOnStatusCode:false}).then(res=>{
                    expect(res.body.errors[0].defaultMessage).to.contain('编码不能为空')
                    expect(res.body.status).to.equal(400)

            })

        })
    })

})
