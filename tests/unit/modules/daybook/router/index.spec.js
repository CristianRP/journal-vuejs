import daybookRouter from "@/modules/daybook/router";

describe("Tests on router module from Dayboo", () => {
  test("should has a valid config", async() => {
    expect(daybookRouter).toMatchObject({
      name: "daybook",
      component: expect.any( Function ),
      children: [
        {
          path: "",
          name: "no-entry",
          component: expect.any( Function ),
        },
        {
          path: ":id",
          name: "entry",
          component: expect.any( Function ),
          props: expect.any( Function )
        },
      ],
    })

    const promiseRoutes = []
    daybookRouter.children.forEach( child => promiseRoutes.push( child.component() ) )

    const routes = (await Promise.all( promiseRoutes )).map( r => r.default.name )

    expect( routes ).toContain('EntryView')
    expect( routes ).toContain('NoEntrySelected')
  })

  test('should return the id of the route', () => {
    const route = {
      params: {
        id: 'ABC-123'
      }
    }

    // expect( daybookRouter.children[1].props( route ) ).toEqual({ id: 'ABC-123' })
    const entryRoute = daybookRouter.children.find( route => route.name === 'entry' )
    expect( entryRoute.props(route) ).toEqual({ id: 'ABC-123' })
  })
})
