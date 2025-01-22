# Mindera - Code challenge

### Setup:

- Clone or download the project
- Extract and open in the VS-Code
- Install the dependencies

      npm i

- Install the Playwright and all the browsers

      npx playwright install --with-deps

- Install the typescript(Optional)

      npm install -g typescript ts-node

### Fix the issue related to security

- Enable the script run on the System (Windows)

      Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

### Assumption

- Products that have in-stock have the attribute @purchasable in DOM structure:

![Screen Shot 2025-01-21 at 16 19 37](https://github.com/user-attachments/assets/ea127dd2-21e4-461f-b17f-216464d62a8f)

- Product with only 1 size: Wallets. It is better to verify in product list page that for each product cart, we have text One size but I don't have enough of times to do that.
- Product with multiple size: any wearable item. Here I choose Bra. Again, it is better to verify in product list page that for each product cart, we have text X, S, M, L, etc... but I don't have enough of times to do that.
- I tried to verify the quantity shown in the popup after clicking on the Add to bag button, but my code is not working as expected; so I perform verification step in Checkout page.
- Title of the page changes accordingly with the option user clicks, so I verified if we are in correct page by checking its title.

# Logging:
- For debugging purpose, I used Winston with 2 transports: 1 for Console and 1 for File. Here is an example of log file:

![Screen Shot 2025-01-21 at 16 32 05](https://github.com/user-attachments/assets/75d56229-b3d4-495c-9294-735192583c4e)


# How to run test
From the terminal, run the script

      npm run cucumber cart

where cart is one of the supported tag defined in index.ts file.

![Screen Shot 2025-01-21 at 16 22 34](https://github.com/user-attachments/assets/23b0e205-f964-4bfe-89cb-8f524914ce32)

# How to generate the report
After the test finished, the report would be generated at folder `reports\report.html`

![Screen Shot 2025-01-21 at 16 16 02](https://github.com/user-attachments/assets/015b332e-e5ea-44dc-9091-3af9cc1ad8ab)

![Screen Shot 2025-01-21 at 16 16 07](https://github.com/user-attachments/assets/07be9b39-ee7f-437a-99af-03dd200518d0)
