`travel.yaml` contains data which is used to render map and

```yaml
countries:
  SG: # country code follows ISO 3166-2
    travel:
      domestic: yes # accepts `yes`, `no`, or `partial`
      inbound: no # accepts `yes`, `no`, or `partial`
      outbound: partial # accepts `yes`, `no`, or `partial`
      inbound_allowed: [JP, UA, US] # list of countries using ISO 3166-2
    reopening:
      "2021-01-01": "[Link to source](https://www.example.com/index.html) More explanation using markdown" # date is in `YYYY-MM-DD` format, followed by markdown text
      "2021-01-02": "[Link to source](https://www.example.com/index.html) More explanation using markdown"
      "2021-01-03": "[Link to source](https://www.example.com/index.html) More explanation using markdown"
    sources:
      domestic:
      - "[title](https://www.example.com/index.html)" # freeform markdown
      - "[title](https://www.example.com/index.html)"
      inbound:
      - "[title](https://www.example.com/index.html)"
      - "[title](https://www.example.com/index.html)"
      outbound:
      - "[title](https://www.example.com/index.html)"
      - "[title](https://www.example.com/index.html)"
```
