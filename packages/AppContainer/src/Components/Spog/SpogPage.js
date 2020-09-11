import React from "react"

const SpogPage = () => (
  <main id="spog">
    <h2>
      This will definitely be a different service but I didn&apos;t want to
      serve the dash on /
    </h2>
    <p>
      Many thanks to <a href="https://twitter.com/thecamjackson">Cam Jackson</a>
      to demonstrate just one way that micro frontends can be implemented and I
      used this project to scaffold this
    </p>
    <p>
      Many more thanks to{" "}
      <a href="https://medium.com/@jenniferfubook">Jennifer Fu</a> for writing
      an article on not changing the web config & supporting chunked repos
    </p>
    <p>
      Micro frontends is an architectural style where independently deliverable
      frontend applications are composed into a greater whole. It&apos;s useful
      for breaking up monolithic frontend codebases into smaller, simpler
      applications that can be delivered to production by multiple teams
      independently.
    </p>
    <p>
      All Developers please read more about the technique, including a full
      explanation of how the code for this demo works, check out the
      <a href="https://martinfowler.com/articles/micro-frontends.html">
        long-form article that Cam wrote for martinfowler.com
      </a>
      .
    </p>
    <p>
      If you just want to read the source code for yourself, it&apos;s all
      available on Github at
      <a href="https://github.com/micro-frontends-demo">
        https://github.com/micro-frontends-demo
      </a>
      .
    </p>
  </main>
)

export default SpogPage
