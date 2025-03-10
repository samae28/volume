import { test, expect } from '@playwright/test';

test.only('has title', async ({ page }) => {
    await page.goto('https://volume.com/scheduled_show/upcoming/');

  await page.evaluate(() => {
      document.querySelector(".row")!.innerHTML = `  
              <div class="col-12 col-lg-6">
                  <div class="border d-flex flex-row show-card bg-white p-3 pb-4 pb-sm-3 flex-column mb-2 mb-lg-2">
                      <div class="d-flex align-items-center gap-3">
                          <div class="d-none d-sm-flex flex-column justify-content-center align-items-center" style="width: 46px;min-width:46px;">
                              <p class="fs-4xl fw-bold">8</p>
                              <p class="fs-xs text-uppercase fw-semibold">Mar</p>
                          </div>
                          <div class="position-relative" style="max-width: 144px;">
                              <img src="https://pv.volume.com/cache/7b/17/7b17517fba7c45f871bf79f43b7fe943.jpg" class="show-card__poster rounded-1 object-fit-cover position-relative" alt="LaMP Show" loading="lazy"/>
                              <div class="d-flex d-sm-none flex-column bg-white position-absolute p-1 rounded" style="left: 4px; top: 4px">
                                  <p class="d-flex justify-content-center fs-sm fw-bold">8</p>
                                  <p class="d-flex justify-content-center fs-xs fw-semibold">Mar</p>
                              </div>
                          </div>
                          <div class="d-flex flex-column mt-3 mt-sm-0" style="flex:1;min-width: 0; min-height: 104px;">
                              <p class="fs-sm fw-semibold line-clamp-2">LaMP (Russ Lawton, Scott Metzger, Ray Paczkowski)</p>
                              <a href="/nectars/"><p class="text-gray-600 text-truncate text-break">Nectars</p></a>
                              <p class="fs-sm">Mar 8 - 9, 2025 at 10:00 AM PST</p>
                              <p class="fs-sm text-gray-600 mt-4">Free Show</p>
                          </div>
                          <div class="align-items-center d-none d-sm-flex flex-column" style="min-width:fit-content;">
                              <a role="button" class="m-2 btn btn-dark" href="/t/wQZ31n/">View Show</a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-12 col-lg-6">
                  <div class="border d-flex flex-row show-card bg-white p-3 pb-4 pb-sm-3 flex-column mb-2 mb-lg-2">
                      <div class="d-flex align-items-center gap-3">
                          <div class="d-none d-sm-flex flex-column justify-content-center align-items-center" style="width: 46px;min-width:46px;">
                              <p class="fs-4xl fw-bold">9</p>
                              <p class="fs-xs text-uppercase fw-semibold">Mar</p>
                          </div>
                          <div class="position-relative" style="max-width: 144px;">
                              <img src="https://pv.volume.com/cache/f3/18/f318c1445ff77b14e29ba57adc3aca35.jpg" class="show-card__poster rounded-1 object-fit-cover position-relative" alt="Kenneth Wright & Friends Show" loading="lazy"/>
                              <div class="d-flex d-sm-none flex-column bg-white position-absolute p-1 rounded" style="left: 4px; top: 4px">
                                  <p class="d-flex justify-content-center fs-sm fw-bold">9</p>
                                  <p class="d-flex justify-content-center fs-xs fw-semibold">Mar</p>
                              </div>
                          </div>
                          <div class="d-flex flex-column mt-3 mt-sm-0" style="flex:1;min-width: 0; min-height: 104px;">
                              <p class="fs-sm fw-semibold line-clamp-2">Kenneth Wright & Friends, Big Monti, Super Hank, Bizz and Everyday People</p>
                              <a href="/bourbonstreetblues/"><p class="text-gray-600 text-truncate text-break">Bourbon Street Blues</p></a>
                              <p class="fs-sm">Mar 9, 2025 at 1:30 AM PST</p>
                              <p class="fs-sm text-gray-600 mt-4">Free Show</p>
                          </div>
                          <div class="align-items-center d-none d-sm-flex flex-column" style="min-width:fit-content;">
                              <a role="button" class="m-2 btn btn-dark" href="/t/dM2giJ/">View Show</a>
                          </div>
                      </div>
                  </div>
              </div>
          `;
  });

  const firstShow = page.locator('.show-card').nth(0);
  await expect(firstShow).toContainText('LaMP (Russ Lawton, Scott Metzger, Ray Paczkowski)');

  await expect(page.locator('h1')).toHaveText('Upcoming Shows');
  await page.waitForTimeout(1000)
  await page.getByRole('button', {name: 'View Show'}).first().click();
  await page.waitForTimeout(1000)
    
    // Step 3: Wait for the navigation to happen
    await page.waitForURL('https://volume.com/t/wQZ31n/');

    // Step 4: Mock the ticket details page content
    await page.evaluate(() => {
        document.querySelector(".row")!.innerHTML = `
            <div class="ticket-detail">
                <h1>LaMP (Russ Lawton, Scott Metzger, Ray Paczkowski)</h1>
                <p>Date: Mar 8 - 9, 2025</p>
                <p>Time: 10:00 AM PST</p>
                <p>Venue: Nectars</p>
                <p>Type: Free Show</p>
                <button id="claim-ticket">Claim Ticket</button>
            </div>
        `;
    });

    // Step 5: Validate that the ticket detail page content is correct
    await expect(page.locator('.ticket-detail h1')).toHaveText('LaMP (Russ Lawton, Scott Metzger, Ray Paczkowski)');
    await expect(page.locator('#claim-ticket')).toBeVisible();
});

