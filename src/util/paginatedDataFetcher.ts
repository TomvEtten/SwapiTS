import { type SwapiRepsonseData } from '../types/swapiResponse'

export class DataFetcher {
  private readonly records: any[] = []

  public async getAllDataFromUrl (url: string): Promise<any> {
    const response = await this.fetchDataFromUrl(url)
    this.records.push(...response.results)
    if (response?.next?.length > 0) {
      return await this.getAllDataFromUrl(response.next)
    }
    return this.records
  }

  private async fetchDataFromUrl (url: string): Promise<SwapiRepsonseData> {
    return await fetch(url).then(async response => {
      return await response.json()
    })
  }
}
