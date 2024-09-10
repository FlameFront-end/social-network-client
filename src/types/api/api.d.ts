declare namespace API {
    interface RequestStrapi {
        collection: string
        query?: string
        id?: number
        body?: object
    }

    interface Request {
        query?: string
        id?: number
        body?: object
    }

    interface Query {
        sort?: string[]
        populate?: object
        pagination?: {
            page?: number
            pageSize?: number
        }
        filters?: object
        publicationState?: 'live' | 'preview'
    }

    interface QueryTable {
        query: string
    }

    interface Response<Data> {
        result: Data
        meta?: {
            pagination?: {
                page: number
                pageSize: number
                pageCount: number
                total: number
            }
        }
    }

    interface webhookAction {
        action: string
    }

    interface webhookData<Data> {
        action: string
        entry: Data
    }
}
