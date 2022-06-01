import daybookRouter from "@/modules/daybook/router";

describe("Tests on router module from Dayboo", () => {
  test("should has a valid config", () => {
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
    });
  });
});
