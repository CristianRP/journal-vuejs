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

    expect( (await daybookRouter.children[0].component()).default.name ).toBe('NoEntrySelected')
    expect( (await daybookRouter.children[1].component()).default.name ).toBe('EntryView')
  })
})
