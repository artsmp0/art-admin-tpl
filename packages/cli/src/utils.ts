export interface Route {
  path: string
  meta: {
    title: string
    icon?: string
    isPage?: boolean
    hideInMenu?: boolean
    hideInTab?: boolean
  }
  children?: Route[]
}

export function flatRoute(routes: Route[]) {
  const arr: Route[] = []
  routes.forEach((route: Route) => {
    arr.push(route)
    if (route.children && route.children.length > 0) {
      arr.push(...flatRoute(route.children))
    }
  })
  return arr
}

export function getParentRoutes(flatRoutes: Route[], childPath: string) {
  const queue: Route[] = []
  const targetParent = flatRoutes.find(r => childPath.includes(r.path))
  if (targetParent) {
    queue.push(targetParent)
    if (targetParent.children?.length) {
      const child = getParentRoutes(targetParent.children, childPath)
      queue.push(...child)
    }
  }
  return queue
}
