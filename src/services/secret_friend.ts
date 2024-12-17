import { Utils } from "@/utils"

export type DrawnResult = {
	id?: number
	person: string
	friend: string
	url?: string
	short_url?: string
}



export class SecretFriend {
	static sort(peoples: Array<string>): DrawnResult[] {
		console.log("Sorted...")
    const result: DrawnResult[] = []
    const shufflePeoples = Utils.shuffle(peoples)

    shufflePeoples.forEach((_, i) => {
      const person_shuffle = shufflePeoples[i]
      const friend = shufflePeoples[i + 1] || shufflePeoples[0]
      const params = new URLSearchParams();
      params.set("person", person_shuffle.toString());
      params.set("friend", friend.toString());
			const url = "/result?" + params.toString()
      const short_url = "/result?code=" + SecretFriend.generate_short_url(person_shuffle, friend)

      const drawn_result = {
        id: i,
        person: person_shuffle,
        friend: friend,
        url: url,
				short_url: short_url
      }

      result[i] = drawn_result
    })

		return SecretFriend.sort_alphabetic(result)
	}

	static generate_short_url(person: string, friend: string): string {
    const encode = JSON.stringify({person:person,friend:friend})
		return btoa(encode)
	}

  static deconded_short_url(encode: string): DrawnResult {
    const decode = atob(encode)
    const drawn_result_decoded = JSON.parse(decode)
    return {
      person: drawn_result_decoded.person || '',
      friend: drawn_result_decoded.friend || '',
    }
  }

  static sort_alphabetic(list: DrawnResult[]): DrawnResult[] {
    return list.sort(function(a, b) {
      if ( a.person < b.person ){
        return -1;
      }
      if ( a.person > b.person ){
        return 1;
      }
      return 0;
    });
  }
}

