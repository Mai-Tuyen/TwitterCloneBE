import { SearchQuery } from '~/models/requests/Search.request'
import databaseService from './database.services'

class SearchService {
  async search(query: SearchQuery) {
    const limit = Number(query.limit)
    const page = Number(query.page)
    const result = databaseService.tweets
      .find({
        $text: { $search: query.content }
      })
      .skip(limit * (page - 1))
      .limit(limit)
      .toArray()
    return result
  }
}

const searchService = new SearchService()
export default searchService
