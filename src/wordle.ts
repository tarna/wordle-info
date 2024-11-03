import { START_DATE, WORDLE_API } from './constants';

export class Wordle {
    private _cache: WordleDay[] = [];

    /**
     * Get the Wordle data for the specified day
     * @param day A number representing the day since launch or a Date object
     * @returns {Promise<WordleDay | null>} The Wordle data for the specified day
     * @example const word1 = await wordle.getDay(1);
     * const word2 = await wordle.getDay(new Date(2024, 10, 3));
     */
    async getDay(day: number | Date): Promise<WordleDay | null> {
        const cachedDay = this.getFromCache(day);
        if (cachedDay) return cachedDay;

        const date = typeof day === 'number' ? this.getDateFromDay(day) : day;
        const data = await this.fetchDayData(date);
        
        if (data) this._cache.push(data);
        return data;
    }

    private getDateFromDay(day: number): Date {
        const date = new Date(START_DATE);
        date.setDate(date.getDate() + day - 1);
        return date;
    }

    private async fetchDayData(date: Date): Promise<WordleDay | null> {
        const response = await fetch(`${WORDLE_API}/${this.formatDate(date)}.json`);
        if (!response.ok) return null;
        
        const data = await response.json() as WordleDay;
        return data.id === 1 ? { ...data, days_since_launch: 0 } : data;
    }

    private getFromCache(day: number | Date): WordleDay | undefined {
        return typeof day === 'number'
            ? this._cache.find(w => w.id === day)
            : this._cache.find(w => w.print_date === this.formatDate(day));
    }

    private formatDate(date: Date): string {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
}

export interface WordleDay {
    id: number;
    solution: string;
    print_date: string;
    days_since_launch: number;
    editor?: string;
}