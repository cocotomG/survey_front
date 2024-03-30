import { inject, provide } from 'vue'

const TableContextSymbol = Symbol('GridTable')
export function createTableContext(instance: IGridTable.Expose) {
  provide(TableContextSymbol, instance)
}

export function useTableContext(): IGridTable.Expose {
  return inject(TableContextSymbol) as IGridTable.Expose
}
