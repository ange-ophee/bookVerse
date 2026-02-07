import { useEffect, useState } from 'react';
import { getBooks } from '../services/bookService';
import BookCard from '../components/BookCard';

export default function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(res => setBooks(res.data));
  }, []);

  return (
    <>
    <style>{`
        body {
          background-color: #f3eadc;
        }

        /* HERO */
        .hero {
          background:
            linear-gradient(rgba(24,34,28,0.6), rgba(24,34,28,0.6)),
            url("https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80");
          background-size: cover;
          background-position: center;
          color: #FAF7F0;
          text-align: center;
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem;
        }

        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
        }

        .hero p {
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* CONTAINER */
        .container {
          max-width: 1200px;
          margin: 4rem auto;
          padding: 0 2rem;
        }

        .section-title {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #2F3E34;
          text-align: center;
        }

        /* BOOK GRID */
        .book-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
          background:
            linear-gradient(rgba(245, 238, 228, 0.85), rgba(230, 215, 195, 0.85)),
            url("https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1600&q=80");
          background-size: cover;
          background-position: center;
          padding: 2rem;
          border-radius: 12px;
        }

        /* WHY BOOKVERSE */
        .why {
          background:
            linear-gradient(rgba(250,247,240,0.95), rgba(250,247,240,0.95)),
            url("https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=1600&q=80");
          background-size: cover;
          padding: 4rem 2rem;
          text-align: center;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .why-card {
          background: #FAF7F0;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        /* HOW IT WORKS */
        .how {
          background:
            linear-gradient(rgba(47,62,52,0.9), rgba(47,62,52,0.9)),
            url("https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1600&q=80");
          color: #FAF7F0;
          padding: 4rem 2rem;
          text-align: center;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .step {
          background: rgba(255,255,255,0.08);
          padding: 2rem;
          border-radius: 12px;
        }

        /* QUOTE */
        .quote {
          background:
            linear-gradient(rgba(24,34,28,0.7), rgba(24,34,28,0.7)),
            url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80");
          color: #FAF7F0;
          text-align: center;
          padding: 5rem 2rem;
          font-style: italic;
          font-size: 1.5rem;
        }

        /* CTA COMMUNITY SECTION */
            .cta {
            position: relative;
            margin-top: 5rem;
            padding: 6rem 2rem;
            text-align: center;
            color: #FAF7F0;

            background:
                linear-gradient(rgba(24, 34, 28, 0.75), rgba(24, 34, 28, 0.75)),
                url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80");
            background-size: cover;
            background-position: center;
            border-radius: 24px;

            animation: slowFloat 18s ease-in-out infinite;
            }

            .cta-content {
            max-width: 720px;
            margin: 0 auto;
            }

            .cta .section-title {
            font-size: 2.6rem;
            margin-bottom: 1rem;
            color: #FAF7F0;
            }

            .cta p {
            font-size: 1.15rem;
            line-height: 1.7;
            opacity: 0.95;
            }

            /* subtle life, not distraction */
            @keyframes slowFloat {
            0% { background-position: center; }
            50% { background-position: center top; }
            100% { background-position: center; }
            }

            @media (max-width: 768px) {
            .cta {
                padding: 4rem 1.5rem;
            }

            .cta .section-title {
                font-size: 2.1rem;
            }
            }

        /* FOOTER */
        footer {
          background: #2F3E34;
          color: #FAF7F0;
          text-align: center;
          padding: 1.5rem;
          font-size: 0.9rem;
        }
       /* FLOW SECTIONS WITH BACKGROUND */
        .flow-section {
        padding: 5rem 0;
        position: relative;
        overflow-x: hidden;
        }

        .flow-section::before {
        content: "";
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        opacity: 0.18;
        z-index: 0;
        }

        .flow-section.bookverse-bg::before {
        background-image: url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80");
        }

        .flow-section.works-bg::before {
        background-image: url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80");
        }

        .flow-title {
        position: relative;
        z-index: 1;
        text-align: center;
        font-size: 2.4rem;
        color: #2F3E34;
        margin-bottom: 3rem;
        }

        /* FLOW TRACK */
        .flow-wrapper {
        overflow: hidden;
        padding: 0 2rem;
        position: relative;
        z-index: 1;
        }

        .flow-track {
        display: flex;
        gap: 2rem;
        width: max-content;
        animation: scrollLeft 55s linear infinite;
        }

        /* BIGGER CARDS */
        .flow-card {
        min-width: 360px;
        max-width: 360px;
        padding: 2.5rem;
        border-radius: 20px;
        color: #FAF7F0;
        box-shadow: 0 15px 35px rgba(0,0,0,0.18);
        background-size: 400% 400%;
        animation: gradientShift 12s ease infinite;
        }

        .flow-card h4 {
        font-size: 1.3rem;
        margin-bottom: 0.6rem;
        }

        .flow-card p {
        font-size: 0.95rem;
        line-height: 1.6;
        opacity: 0.95;
        }

        /* GRADIENTS */
        .grad-1 {
        background-image: linear-gradient(135deg, #2E7D32, #6D4C41, #2F3E34);
        }

        .grad-2 {
        background-image: linear-gradient(135deg, #6D4C41, #2F3E34, #2E7D32);
        }

        .grad-3 {
        background-image: linear-gradient(135deg, #2F3E34, #2E7D32, #6D4C41);
        }

        /* ANIMATIONS */
        @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
        }

        @keyframes scrollLeft {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
        }

    `}</style>

    {/* HERO */}
    <section className="hero">
        <h1>Discover your next favorite book</h1>
        <p>
          BookVerse is a cozy place to explore books, share reviews,
          and see what others are reading.
        </p>
    </section>

    {/* WHY BOOKVERSE */}
    <section className="flow-section bookverse-bg">
        <h2 className="flow-title">Why BookVerse</h2>

        <div className="flow-wrapper">
            <div className="flow-track">
            {[
                {
                title: "Curated by Readers",
                text: "BookVerse highlights books recommended by real readers, not algorithms pushing trends."
                },
                {
                title: "Honest Reviews",
                text: "Every review comes from lived reading experiences, giving you insight beyond ratings."
                },
                {
                title: "A Cozy Reading Space",
                text: "No distractions, no noise—just books, thoughts, and meaningful conversations."
                },
                {
                title: "Community Driven",
                text: "Discover what people around you are reading and loving right now."
                },
                {
                title: "Track Your Journey",
                text: "Build a personal library that reflects what you’ve read, loved, and learned."
                },
                {
                title: "Made for Book Lovers",
                text: "Designed with warmth, calm colors, and flow—because reading should feel good."
                }
            ].map((item, i) => (
                <div key={i} className={`flow-card grad-${(i % 3) + 1}`}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
                </div>
            ))}

            {/* duplicate */}
            {[...Array(6)].map((_, i) => (
                <div key={`dup-${i}`} className={`flow-card grad-${(i % 3) + 1}`}>
                <h4>BookVerse Value</h4>
                <p>Where books and readers genuinely connect in a calm, thoughtful space.</p>
                </div>
            ))}
            </div>
        </div>
    </section>

    {/* FEATURED BOOKS */}
    <section className="container">
        <h2 className="section-title">Featured Books</h2>
        <div className="book-grid">
          {books.slice(0, 4).map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
    </section>

    {/* HOW IT WORKS */}
    <section className="flow-section works-bg">
        <h2 className="flow-title">How It Works</h2>

        <div className="flow-wrapper">
            <div className="flow-track">
            {[
                {
                title: "Create an Account",
                text: "Join BookVerse and personalize your reading space in seconds."
                },
                {
                title: "Explore Books",
                text: "Browse a growing library filled with reviews and community favorites."
                },
                {
                title: "Read Reviews",
                text: "See what others think before you commit your time to a book."
                },
                {
                title: "Add What You Read",
                text: "Keep track of books you’ve finished and want to remember."
                },
                {
                title: "Write Reviews",
                text: "Share your thoughts and help others discover great reads."
                },
                {
                title: "Grow Your Library",
                text: "Over time, your profile becomes a reflection of your reading journey."
                }
            ].map((step, i) => (
                <div key={i} className={`flow-card grad-${(i % 3) + 1}`}>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
                </div>
            ))}

            {/* duplicate */}
            {[...Array(6)].map((_, i) => (
                <div key={`dup-step-${i}`} className={`flow-card grad-${(i % 3) + 1}`}>
                <h4>Your Journey</h4>
                <p>Simple steps that turn reading into a shared experience.</p>
                </div>
            ))}
            </div>
        </div>
    </section>

    {/* RECENTLY ADDED */}
    <section className="container">
        <h2 className="section-title">Recently Added</h2>
        <div className="book-grid">
          {books.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
    </section>

    {/* QUOTE */}
    <section className="quote">
        “A room without books is like a body without a soul.”
    </section>

    {/* CTA */}
    <section className="cta">
        <div className="cta-content">
            <h2 className="section-title">Join the BookVerse Community</h2>
            <p>
            A shared space for readers to discover books, exchange thoughts,
            and grow through stories together.
            </p>
        </div>
    </section>

    {/* FOOTER */}
    <footer>
        © {new Date().getFullYear()} BookVerse · Made with 🤍 for readers
    </footer>
    </>
  );
}
