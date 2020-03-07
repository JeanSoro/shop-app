import { createSelector } from 'reselect';

// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5
// }

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  collections => collections ? Object.keys(collections).map(key => collections[key])
    : []
);

export const selectCollection = collectionUrlParam => createSelector(
  [selectShopCollections],
  collections => (collections ? collections[collectionUrlParam] : null)

  // if using array instead of hashtable: collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
)

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  //selecting shop reducer
  shop => shop.isFetching
)

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  //!!change value into truthy or falsy
  shop => !!shop.collections
)