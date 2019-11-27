from django.core.cache import caches
from threading import Timer

def cached_fn(key, timeout_seconds = 60 * 5, cache_type = 'default'):
    def decorator(original_fn):
        def resulting_fn(*args, **kwargs):
            cache_key = key(*args, **kwargs) if callable(key) else key

            cached_result = cache.get(cache_key)
            if cached_result is not None:
                return cached_result

            try:
                result = original_fn(*args, **kwargs)
                cache.set(cache_key, result, timeout_seconds)
                return result
            except:
                pass

        return resulting_fn
    return decorator