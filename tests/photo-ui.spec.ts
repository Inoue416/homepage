import { expect, test } from '@playwright/test';

test('renders one overlaid photo per memory and opens it fullscreen', async ({ page }) => {
  await page.goto('/photo-ui/');

  await expect(page.getByRole('heading', { name: '写真の記録' })).toBeVisible();
  await expect(page.getByRole('link', { name: '写真が増えた時のUI案を見る' })).toBeVisible();
  await expect(page.getByTestId('photo-memory')).toHaveCount(3);

  const memories = page.getByTestId('photo-memory');

  for (let index = 0; index < 3; index += 1) {
    const memory = memories.nth(index);

    await expect(memory.getByTestId('memory-photo-link')).toHaveCount(1);
    await expect(memory.locator('.photo-overlay')).toBeVisible();
  }

  await memories.first().getByTestId('memory-photo-link').click();

  const lightbox = page.getByTestId('photo-lightbox').first();
  await expect(lightbox).toBeVisible();
  await expect(lightbox.locator('.lightbox-panel img')).toHaveCount(1);
  await expect(lightbox.getByRole('link', { name: '閉じる', exact: true })).toBeVisible();

  const box = await lightbox.boundingBox();
  const viewport = page.viewportSize();

  if (!box || !viewport) {
    throw new Error('fullscreen photo lightbox was not measurable');
  }

  expect(Math.round(box.width)).toBe(viewport.width);
  expect(Math.round(box.height)).toBe(viewport.height);
});

test('renders only the selected scale UI and opens one photo fullscreen', async ({ page }) => {
  await page.goto('/photo-ui/scale/');

  await expect(page.getByRole('heading', { name: '写真が増えた時の表示' })).toBeVisible();
  await expect(page.getByTestId('scale-proposal')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: '最新重視' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '月で区切る一覧' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: '月別カルーセル' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'ページング' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: '年月ナビ付き' })).toHaveCount(0);

  const firstProposal = page.getByTestId('scale-proposal').first();
  await expect(firstProposal.getByTestId('scale-photo-link').first()).toBeVisible();
  await expect(firstProposal.locator('.photo-overlay').first()).toBeVisible();
  await firstProposal.getByTestId('scale-photo-link').first().click();

  const lightbox = page.getByTestId('scale-photo-lightbox').first();
  await expect(lightbox).toBeVisible();
  await expect(lightbox.locator('.lightbox-panel img')).toHaveCount(1);
  await expect(lightbox.getByRole('link', { name: '閉じる', exact: true })).toBeVisible();

  const box = await lightbox.boundingBox();
  const viewport = page.viewportSize();

  if (!box || !viewport) {
    throw new Error('scale photo lightbox was not measurable');
  }

  expect(Math.round(box.width)).toBe(viewport.width);
  expect(Math.round(box.height)).toBe(viewport.height);
});
