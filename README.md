# CV.Network

> Axel Springer 2016 Hackathon team CV.Network frontend

A Node.js web frontend for the CV.Network application

## Why?

CVs _suck_, but we still use them, because everyone needs them!

Back in school, we were taught how to write a CV. Aside from emailing instead of printing it, the process is largely unchanged for the modern job seeker.

#### Problems

* Internal **HR** have to check and filter a large number of CVs documents
* External **recruiters** need to filter a large number of CV documents
* **Candidates** applying for jobs on different boards and company portals need to upload their CV and manually verify their information has been entered correctly
* **Candidates** who share their CV on jobsites can have their data scraped or sold on by rogue agencies, who contact the candidate with untargeted rubbish.
* **Candidates** expect the document they upload to be the on their **employer** sees.

LinkedIn looked like the answer, but they don’t share their data. They are also famous for pestering their users and snooping on their user’s inboxes in order to grow their userbase.  Now they’ve been bought by Microsoft, who are also famous for pestering their users.

![We'll make our own API](http://www.axelspringerhackday.de/wp-content/uploads/rtMedia/groups/31/2016/06/image00.png "We'll make our own API")

**We’ve had enough**, so members from [Jobsite](http://www.jobsite.co.uk), [Stepstone](https://www.stepstone.com/) and [Workray](https://www.workray.com/) united to build the world’s first open CV API. Something to build a bridge over all these problems and put jobseekers first, with benefits for everyone involved in the process!

## Usage

#### Web Frontend
* [CV.Network](https://thawing-island-91017.herokuapp.com/)
* [CV.Network](https://thawing-island-91017.herokuapp.com/?banner=1) - with banner ads

#### Available API endpoints
* [CV Retrieval](https://cv-data.herokuapp.com/api/cvdata/36/get)
* [CV Statistics](https://cv-sharing-hackaton.herokuapp.com/user/36/share/stats)
* [Sharing Groups](https://cv-sharing-hackaton.herokuapp.com/groups)

## Credits

Thanks to Annabel Spiteri and Piotr Wilczyński for the APIs, Aiden Brusby for design, Harry King for concept and marketing, finally myself Nigel Horton for the frontend.

## License

```
The MIT License (MIT)

Copyright (c) 2016 clocked0ne

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
