describe("Login Form E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("başarılı form doldurulduğunda success sayfasını açar", () => {
    cy.get('[data-cy="email-input"]').type("test@test.com");
    cy.get('[data-cy="password-input"]').type("Abcd1234");
    cy.get('[data-cy="terms-input"]').check();

    cy.get('[data-cy="submit-button"]').should("not.be.disabled");
    cy.get('[data-cy="submit-button"]').click();

    cy.url().should("include", "/success");
    cy.get('[data-cy="success-message"]').should("be.visible");
    cy.contains("Başarıyla giriş yaptınız.").should("be.visible");
  });

  it("email yanlışsa 1 hata mesajı gösterir ve buton disabled kalır", () => {
    cy.get('[data-cy="email-input"]').type("yanlis");
    cy.get('[data-cy="password-input"]').type("Abcd1234");
    cy.get('[data-cy="terms-input"]').check();

    cy.get('[data-cy="email-error"]')
      .should("be.visible")
      .and("contain", "Geçerli bir email giriniz.");

    cy.get('[data-cy="submit-button"]').should("be.disabled");
  });

  it("email ve password yanlışsa 2 hata mesajı gösterir", () => {
    cy.get('[data-cy="email-input"]').type("yanlis");
    cy.get('[data-cy="password-input"]').type("1234");
    cy.get('[data-cy="terms-input"]').check();

    cy.get('[data-cy="email-error"]').should("be.visible");
    cy.get('[data-cy="password-error"]')
      .should("be.visible")
      .and(
        "contain",
        "Şifre en az 8 karakter olmalı, bir büyük harf, bir küçük harf ve bir rakam içermelidir."
      );

    cy.get('[data-cy="submit-button"]').should("be.disabled");
  });

  it("email ve password doğru ama şartlar kabul edilmediyse buton disabled kalır", () => {
    cy.get('[data-cy="email-input"]').type("test@test.com");
    cy.get('[data-cy="password-input"]').type("Abcd1234");

    cy.get('[data-cy="submit-button"]').should("be.disabled");
  });
});