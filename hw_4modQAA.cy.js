describe("Testy dla API: https://httpbin.org", () => {
  
  
  
  it("Test_1 poprawność url", () => {
    cy.request({
      method: "GET",
      url: `https://httpbin.org`,
    }).as("request_1");

    cy.get("@request_1").then((response) => {
      expect(response.status).to.eq(200);
    });
  });



  it("Test_2 metoda PUT", () => {
    cy.request({
      method: "PUT",
      url: `https://httpbin.org/put`,
    }).as("request_2");

    cy.get("@request_2").then((response) => {
      expect(response.status).to.eq(200);
    });
  });



it("Test_3 zmienne", () => {
  cy.request({
    method: "GET",
    url: `https://httpbin.org/get`,
    qs: {
      zmienna_1: "test zmienna_1",
      zmienna_2: "test zmienna_2",
    },
  }).as("request_3");

  cy.get("@request_3").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.args.zmienna_1).to.eq("test zmienna_1");
    expect(response.body.args.zmienna_2).to.eq("test zmienna_2");
  });
});

 
  
  it("Test_4 niedozwolona metoda", () => {
    cy.request({
      method: "PATCH",
      url: `https://httpbin.org/get`,
      failOnStatusCode: false,
    }).as("request_4");

    cy.get("@request_4").then((response) => {
      expect(response.status).to.eq(405);
    });
  });

 

  it("Test_5 metoda DELETE", () => {
    cy.request({
      method: "DELETE",
      url: `https://httpbin.org/delete`,
    }).as("request_5");

    cy.get("@request_5").then((response) => {
      expect(response.status).to.eq(200);
    });
  });



it("Test_6 HEADERS", () => {
  cy.request({
    method: "GET",
    url: `https://httpbin.org/headers`,
    headers: {
      "User-Agent": "Google Chrome/112.0.5615.138",
    },
  }).as("request_6");

  cy.get("@request_6").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.headers["User-Agent"]).to.eq(
      "Google Chrome/112.0.5615.138"
    );
  });
});





  const bodyData = {
    title: "Halny",
    author: "Remigiusz Mróz",
  };

  it("Test_7 metoda POST", () => {
    cy.request({
      method: "POST",
      url: `https://httpbin.org/post`,
      json: bodyData,
    }).as("request_7");

    cy.get("@request_7").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.json).to.deep.eq(bodyData);
    });
  });

  
  
  
  it("Test_8 czasu odpowiedzi", () => {
    cy.request({
      method: "GET",
      url: `https://httpbin.org/delay/2`,
    }).as("request_8");

    cy.get("@request_8").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.greaterThan(1500);
    });
  });




  it("Test_9 losowy parametr", () => {
    const random = Math.floor(Math.random() * 500);
    cy.request({
      method: "GET",
      url: "https://httpbin.org/get",
      qs: {
        random: random,
      },
    }).as("request_9")

    cy.get("@request_9").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.args.random).to.eq(random.toString());
    });
  });

  

it("Test_10 metoda PATCH", () => {
  const data = { key: "value" };
  cy.request({
    method: "PATCH",
    url: `https://httpbin.org/patch`,
    body: data,
  }).as("request_10");

  cy.get("@request_10").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.json).to.deep.eq(data);
  });
});


  
});